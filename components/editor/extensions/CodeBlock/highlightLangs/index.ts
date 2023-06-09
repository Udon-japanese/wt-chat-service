import { lowlight } from "lowlight/lib/core";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import java from "highlight.js/lib/languages/java";
import python from "highlight.js/lib/languages/python";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import php from "highlight.js/lib/languages/php";
import swift from "highlight.js/lib/languages/swift";
import ruby from "highlight.js/lib/languages/ruby";
import kotlin from "highlight.js/lib/languages/kotlin";
import bash from "highlight.js/lib/languages/bash";
import go from "highlight.js/lib/languages/go";
import rust from "highlight.js/lib/languages/rust";
import r from "highlight.js/lib/languages/r";
import dart from "highlight.js/lib/languages/dart";
import perl from "highlight.js/lib/languages/perl";
import julia from "highlight.js/lib/languages/julia";
import matlab from "highlight.js/lib/languages/matlab";
import lua from "highlight.js/lib/languages/lua";
import objectivec from "highlight.js/lib/languages/objectivec";
import groovy from "highlight.js/lib/languages/groovy";
import shell from "highlight.js/lib/languages/shell";
import scala from "highlight.js/lib/languages/scala";
import vbnet from "highlight.js/lib/languages/vbnet";
import crystal from "highlight.js/lib/languages/crystal";
import elixir from "highlight.js/lib/languages/elixir";
import lisp from "highlight.js/lib/languages/lisp";
import prolog from "highlight.js/lib/languages/prolog";
import ada from "highlight.js/lib/languages/ada";
import scheme from "highlight.js/lib/languages/scheme";
import sql from "highlight.js/lib/languages/sql";
import powershell from "highlight.js/lib/languages/powershell";
import fsharp from "highlight.js/lib/languages/fsharp";
import haskell from "highlight.js/lib/languages/haskell";
import x86asm from "highlight.js/lib/languages/x86asm";
import erlang from "highlight.js/lib/languages/erlang";
import tcl from "highlight.js/lib/languages/tcl";
import clojure from "highlight.js/lib/languages/clojure";
import ocaml from "highlight.js/lib/languages/ocaml";
import reasonml from "highlight.js/lib/languages/reasonml";
import haxe from "highlight.js/lib/languages/haxe";
import graphql from "highlight.js/lib/languages/graphql";
import scss from "highlight.js/lib/languages/scss";
import less from "highlight.js/lib/languages/less";
import stylus from "highlight.js/lib/languages/stylus";
import markdown from "highlight.js/lib/languages/markdown";
import yaml from "highlight.js/lib/languages/yaml";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";
import processing from "highlight.js/lib/languages/processing";
import protobuf from "highlight.js/lib/languages/protobuf";
import thrift from "highlight.js/lib/languages/thrift";
import bnf from "highlight.js/lib/languages/bnf";
import elm from "highlight.js/lib/languages/elm";
import brainfuck from "highlight.js/lib/languages/brainfuck";
import vbscript from "highlight.js/lib/languages/vbscript";
import coffeescript from "highlight.js/lib/languages/coffeescript";
import handlebars from "highlight.js/lib/languages/handlebars";
import dust from "highlight.js/lib/languages/dust";
import haml from "highlight.js/lib/languages/haml";


lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);
lowlight.registerLanguage("java", java);
lowlight.registerLanguage("python", python);
lowlight.registerLanguage("c", c);
lowlight.registerLanguage("cpp", cpp);
lowlight.registerLanguage("csharp", csharp);
lowlight.registerLanguage("php", php);
lowlight.registerLanguage("swift", swift);
lowlight.registerLanguage("ruby", ruby);
lowlight.registerLanguage("kotlin", kotlin);
lowlight.registerLanguage("bash", bash);
lowlight.registerLanguage("go", go);
lowlight.registerLanguage("rust", rust);
lowlight.registerLanguage("r", r);
lowlight.registerLanguage("dart", dart);
lowlight.registerLanguage("perl", perl);
lowlight.registerLanguage("julia", julia);
lowlight.registerLanguage("matlab", matlab);
lowlight.registerLanguage("lua", lua);
lowlight.registerLanguage("objectivec", objectivec);
lowlight.registerLanguage("groovy", groovy);
lowlight.registerLanguage("shell", shell);
lowlight.registerLanguage("scala", scala);
lowlight.registerLanguage("vbnet", vbnet);
lowlight.registerLanguage("crystal", crystal);
lowlight.registerLanguage("elixir", elixir);
lowlight.registerLanguage("lisp", lisp);
lowlight.registerLanguage("prolog", prolog);
lowlight.registerLanguage("ada", ada);
lowlight.registerLanguage("scheme", scheme);
lowlight.registerLanguage("sql", sql);
lowlight.registerLanguage("powershell", powershell);
lowlight.registerLanguage("fsharp", fsharp);
lowlight.registerLanguage("haskell", haskell);
lowlight.registerLanguage("x86asm", x86asm);
lowlight.registerLanguage("erlang", erlang);
lowlight.registerLanguage("tcl", tcl);
lowlight.registerLanguage("clojure", clojure);
lowlight.registerLanguage("ocaml", ocaml);
lowlight.registerLanguage("reasonml", reasonml);
lowlight.registerLanguage("haxe", haxe);
lowlight.registerLanguage("graphql", graphql);
lowlight.registerLanguage("scss", scss);
lowlight.registerLanguage("less", less);
lowlight.registerLanguage("stylus", stylus);
lowlight.registerLanguage("markdown", markdown);
lowlight.registerLanguage("yaml", yaml);
lowlight.registerLanguage("json", json);
lowlight.registerLanguage("xml", xml);
lowlight.registerLanguage("processing", processing);
lowlight.registerLanguage("protobuf", protobuf);
lowlight.registerLanguage("thrift", thrift);
lowlight.registerLanguage("bnf", bnf);
lowlight.registerLanguage("elm", elm);
lowlight.registerLanguage("brainfuck", brainfuck);
lowlight.registerLanguage("vbscript", vbscript);
lowlight.registerLanguage("coffeescript", coffeescript);
lowlight.registerLanguage("handlebars", handlebars);
lowlight.registerLanguage("dust", dust);
lowlight.registerLanguage("haml", haml);


export default lowlight;