import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { Icon } from "@iconify/react";
import { ProfileSettingFormProps } from "@/@types/Auth";
import { successToast ,errorToast } from "@/lib/toast";
import { handleInputChange, handleSubmit } from "@/@types/Form";
import { useAuthContext } from "../../AuthProvider";

export default function ProfileSettingForm({
  userIcon,
  setUserIcon,
  iconURL,
  setIconURL,
  openIconModal,
  fileInputRef,
}: ProfileSettingFormProps) {
  const [exceedsLimit, setExceedsLimit] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>("");
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const { user } = useAuthContext();
  const { push } = useRouter();

  useEffect(() => {
    if (displayName.length > 80) {
      setExceedsLimit(true);
    } else {
      setExceedsLimit(false);
    }
  }, [displayName]);

  useEffect(() => {
    if (!userIcon) return;
    try {
      if (userIcon.type.split("/")[0] !== "image") {
        throw new Error("画像ファイルのみアップロードできます");
      } else if (userIcon.size > 1000000) {
        throw new Error("1MB以下のサイズの画像をアップロードしてください");
      }
    } catch (err: any) {
      errorToast(err.message);
      setUserIcon(null);
      return;
    }

    setIconURL(URL.createObjectURL(userIcon));
  }, [userIcon]);

  const handleDisplayNameChange: handleInputChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleUserIconChange: handleInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) setUserIcon(files[0]);
  };

  const handleSubmit: handleSubmit = (e) => {
    e.preventDefault();
    submitBtnRef.current?.blur();
    setSubmitting(true);
    if (user === null) {
      errorToast("セッションの有効期限が切れました。サインインしてください");
      push("/signin");
      return;
    }
    const trimmedName = displayName.trim();
    if (!trimmedName) {
      errorToast("名前を空白(スペース)のみにすることはできません");
      setSubmitting(false);
      return;
    }
    if (!user) return;

    let uploadData: Blob | File | undefined;
    let storageURL: string = "";

    if (!userIcon) {
      const svg = document.querySelector(".default-icon");
      if (!svg) return;
      const serializer = new XMLSerializer();
      const svgStr = serializer.serializeToString(svg);
      uploadData = new Blob([svgStr], { type: "image/svg+xml" });
      storageURL = `user-icons/${user.uid}.svg`;
    } else {
      const fileName: string = userIcon.name;
      const lastDotI: number = fileName.lastIndexOf(".");
      const fileExtension: string = fileName.substring(lastDotI);
      uploadData = userIcon;
      storageURL = `user-icons/${user.uid}${fileExtension}`;
    }

    const storage = getStorage();
    const storageRef = ref(storage, storageURL);
    uploadBytes(storageRef, uploadData)
      .then((snapshot) => {
        return getDownloadURL(ref(storage, storageURL));
      })
      .then(async (url) => {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) return;
        await updateProfile(currentUser, {
          displayName,
          photoURL: url,
        });
      })
      .then(() => {
        setSubmitting(false);
        successToast("サインアップが完了しました");
        push("/");
      })
      .catch((err) => {
        console.error(err);
        errorToast("エラーが発生しました。時間を置いてから再度お試しください");
        push("/signin");
      });
  };

  return (
    <>
      <Head>
        <title>サインアップ - プロフィール設定</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <div className="fixed inset-0 flex flex-col items-center justify-center">
          <div className="w-full rounded-lg border border-gray-400 bg-white p-10 dark:border-gray-500 dark:bg-gray-700 md:w-1/2 lg:w-[40%]">
            <p className="mb-10 truncate text-center text-2xl font-extrabold leading-6 text-gray-800 dark:text-gray-300">
              プロフィール設定
            </p>
            <div className="mb-5 flex flex-row items-center justify-center">
              <div className="h-0.5 w-full bg-gray-400" />
              <p className="break-keep text-center text-lg font-medium leading-6 text-gray-800 dark:text-gray-300">
                プロフィール画像を設定
              </p>
              <div className="h-0.5 w-full bg-gray-400" />
            </div>
            <div className="mb-8 flex flex-col items-center justify-center text-sm font-medium leading-none sm:flex-row">
              {userIcon && iconURL ? (
                <>
                  <div className="relative">
                    <Image
                      className="aspect-square h-full w-24 rounded-md object-cover"
                      src={iconURL}
                      alt="user-icon"
                      width={1000}
                      height={1000}
                    />
                    <button
                      type="button"
                      onClick={openIconModal}
                      data-tooltip-id="delete-image"
                      data-tooltip-content="アイコンを削除"
                      className="absolute left-0 top-0 -mt-1 rounded-full bg-gray-900 p-1 text-red-600 dark:bg-gray-800"
                    >
                      <Icon icon="material-symbols:delete-outline" width={20} />
                    </button>
                  </div>
                </>
              ) : (
                <Icon
                  icon="icon-park:avatar"
                  className="default-icon"
                  width={100}
                />
              )}
              <div className="ml-0 mt-5 flex flex-col items-center justify-center sm:ml-6 sm:mt-0">
                <p className="mb-4 text-gray-800 dark:text-gray-300">
                  1MB以下の画像ファイルのみアップロードできます
                </p>
                <label
                  tabIndex={0}
                  className="flex cursor-pointer items-center justify-center truncate rounded-lg bg-blue-700 px-5 py-2.5 text-white hover:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700"
                  htmlFor="user-icon"
                >
                  <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    name="user-icon"
                    id="user-icon"
                    onChange={handleUserIconChange}
                    ref={fileInputRef}
                  />
                  <Icon
                    icon="material-symbols:upload"
                    width={18}
                    className="mr-1"
                  />
                  アイコンを変更
                </label>
              </div>
            </div>
            <div className="mb-7 flex flex-row items-center justify-center">
              <div className="h-0.5 w-full bg-gray-400" />
              <p className="break-keep text-center text-lg font-medium leading-6 text-gray-800 dark:text-gray-300">
                表示名を設定
              </p>
              <div className="h-0.5 w-full bg-gray-400" />
            </div>
            <div className="relative">
              <input
                type="text"
                value={displayName}
                onChange={handleDisplayNameChange}
                aria-label="enter display name"
                id="display-name"
                className={`peer block w-full appearance-none rounded-md border bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:text-white ${
                  exceedsLimit
                    ? "border-red-600 dark:border-red-500"
                    : "border-gray-300 focus:border-blue-600 dark:border-gray-500 dark:focus:border-blue-500"
                }`}
                placeholder=" "
                autoComplete="off"
                required
              />
              <label
                htmlFor="display-name"
                className={`absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm duration-[160ms] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-gray-700 ${
                  exceedsLimit
                    ? "text-red-600 dark:text-red-500"
                    : "text-gray-500 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
                }`}
              >
                表示名
              </label>
            </div>
            <div className="flex flex-row">
              {exceedsLimit && (
                <p className="mt-2 flex flex-row text-sm text-red-600 dark:text-red-500">
                  <Icon icon="carbon:warning" className="mr-1 flex-shrink-0" width={18} />
                  名前は80文字以下で入力してください
                </p>
              )}
            </div>
            <div className="mt-8">
              <button
                type="submit"
                ref={submitBtnRef}
                disabled={submitting || exceedsLimit ? true : false}
                className={`flex w-full items-center justify-center truncate rounded-lg px-5 py-2.5 text-sm font-medium text-white enabled:hover:bg-blue-400 enabled:dark:hover:bg-blue-700 ${
                  submitting || exceedsLimit
                    ? "cursor-not-allowed bg-blue-800"
                    : "bg-blue-700 dark:bg-blue-600"
                }`}
              >
                {submitting ? (
                  <div
                    className="h-5 w-5 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "保存する"
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
