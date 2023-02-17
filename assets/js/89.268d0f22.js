(window.webpackJsonp=window.webpackJsonp||[]).push([[89],{428:function(t,e,a){"use strict";a.r(e);var _=a(0),v=Object(_.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h3",{attrs:{id:"什么是正则表达式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#什么是正则表达式"}},[t._v("#")]),t._v(" 什么是正则表达式")]),t._v(" "),e("p",[t._v("正则表达式是一组由字母和符号组成的特殊文本，它可以用来从文本中找出满足你想要的格式的句子。")]),t._v(" "),e("h3",{attrs:{id:"_1-基本匹配"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-基本匹配"}},[t._v("#")]),t._v(" 1. 基本匹配")]),t._v(" "),e("p",[t._v("最基础的匹配方式，如：")]),t._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('"the" => The fat cat sat on the mat. \n')])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br")])]),e("p",[t._v("即可找出句子中the这个单词。\n正则表达式大小写敏感，所以"),e("code",[t._v("The")]),t._v("不会匹配"),e("code",[t._v("the")]),t._v("。")]),t._v(" "),e("h3",{attrs:{id:"_2-元字符"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-元字符"}},[t._v("#")]),t._v(" 2. 元字符")]),t._v(" "),e("p",[t._v("正则表达式主要依赖于元字符。 元字符不代表他们本身的字面意思，他们都有特殊的含义。\n一些元字符写在方括号中的时候有一些特殊的意思。以下是一些元字符的介绍：")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"center"}},[t._v("元字符")]),t._v(" "),e("th",{staticStyle:{"text-align":"center"}},[t._v("描述")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v(".")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("实心点匹配任意单个字符除了换行符。")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("[ ]")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("字符种类。匹配方括号内的任意字符。")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("[^ ]")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("否定的字符种类。匹配除了方括号里的任意字符")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("*")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("匹配>=0个重复的在*号之前的字符。")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("+")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("匹配>=1个重复的+号前的字符。")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("?")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("标记?之前的字符为可选.")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("{n,m}")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("匹配num个大括号之间的字符 (n <= num <= m).")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("(xyz)")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("字符集，匹配与 xyz 完全相等的字符串.")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("|")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("或运算符，匹配符号前或后的字符.")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("\\")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("转义字符,用于匹配一些保留的字符 "),e("code",[t._v("[ ] ( ) { } . * + ? ^ $ \\ |")])])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("^")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("从开始行开始匹配.")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("$")]),t._v(" "),e("td",{staticStyle:{"text-align":"center"}},[t._v("从末端开始匹配")])])])]),t._v(" "),e("p",[t._v("下面开始举例说明。")]),t._v(" "),e("h4",{attrs:{id:"_2-1-点运算符"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-点运算符"}},[t._v("#")]),t._v(" 2.1 点运算符 "),e("code",[t._v(".")])]),t._v(" "),e("p",[e("code",[t._v(".")]),t._v("是元字符中最简单的例子。 "),e("code",[t._v(".")]),t._v("匹配任意单个字符，但不匹配换行符。 例如，表达式"),e("code",[t._v(".ar")]),t._v("匹配一个任意字符后面跟着是"),e("code",[t._v("a")]),t._v("和"),e("code",[t._v("r")]),t._v("的字符串。")]),t._v(" "),e("pre",[t._v('".ar" => The '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("car")])]),t._v(" "),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("par")])]),t._v("ked in the "),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("gar")])]),t._v("age.\n")]),t._v(" "),e("h4",{attrs:{id:"_2-2-字符集"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-字符集"}},[t._v("#")]),t._v(" 2.2 字符集 "),e("code",[t._v("[]")])]),t._v(" "),e("p",[t._v("字符集也叫做字符类。 方括号用来指定一个字符集。 在方括号中可使用连字符来指定字符集的范围。 在方括号中的字符集"),e("strong",[t._v("不关心顺序")]),t._v("。 例如，表达式"),e("code",[t._v("[Tt]he")]),t._v(" 匹配 "),e("code",[t._v("the")]),t._v(" 和 "),e("code",[t._v("The")]),t._v("。")]),t._v(" "),e("pre",[t._v("“[Tt]he” => "),e("a",{attrs:{href:"#2.2字符集"}},[t._v("The")]),t._v(" car parked in "),e("a",{attrs:{href:"#2.2字符集"}},[t._v("the")]),t._v(" garage.")]),t._v(" "),e("p",[t._v("方括号的句号就表示句号。 表达式 "),e("code",[t._v("ar[.]")]),t._v(" 匹配 "),e("code",[t._v("ar.")]),t._v("字符串")]),t._v(" "),e("pre",[t._v('"ar[.]" => A garage is a good place to park a c'),e("a",{attrs:{href:"#2.2字符集"}},[t._v("ar.")]),t._v("\n")]),t._v(" "),e("h5",{attrs:{id:"_2-2-1-否定字符集"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-1-否定字符集"}},[t._v("#")]),t._v(" 2.2.1 否定字符集"),e("code",[t._v("[^]")])]),t._v(" "),e("p",[t._v("一般来说 "),e("code",[t._v("^")]),t._v(" 表示一个字符串的开头，但它用在一个方括号的开头的时候，它表示这个字符集是否定的。 例如，表达式"),e("code",[t._v("[^c]ar")]),t._v(" 匹配一个后面跟着"),e("code",[t._v("ar")]),t._v("的除了"),e("code",[t._v("c")]),t._v("的任意字符。")]),t._v(" "),e("pre",[t._v('“[^car]" => The car '),e("a",{attrs:{href:"#2.2.1"}},[t._v("par")]),t._v("ked in the "),e("a",{attrs:{href:"#2.2.1"}},[t._v("gar")]),t._v("age.")]),t._v(" "),e("h4",{attrs:{id:"_2-3-重复次数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-重复次数"}},[t._v("#")]),t._v(" 2.3 重复次数")]),t._v(" "),e("p",[t._v("后面跟着元字符 "),e("code",[t._v("+")]),t._v("，"),e("code",[t._v("*")]),t._v(" or "),e("code",[t._v("?")]),t._v(" 的，用来指定匹配子模式的次数。 这些元字符在不同的情况下有着不同的意思。")]),t._v(" "),e("h5",{attrs:{id:"_2-3-1-号"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-1-号"}},[t._v("#")]),t._v(" 2.3.1 "),e("code",[t._v("*")]),t._v("号")]),t._v(" "),e("p",[e("code",[t._v("*")]),t._v("号匹配 在"),e("code",[t._v("*")]),t._v("之前的字符出现"),e("code",[t._v("大于等于0")]),t._v("次。 例如，表达式 "),e("code",[t._v("a*")]),t._v(" 匹配0或更多个以a开头的字符。表达式"),e("code",[t._v("[a-z]*")]),t._v(" 匹配一个行中所有以小写字母开头的字符串。")]),t._v(" "),e("pre",[t._v('"[a-z]*" => T'),e("a",{attrs:{href:"#2.3.1"}},[t._v("he")]),t._v(" "),e("a",{attrs:{href:"#2.3.1"}},[t._v("car")]),t._v(" "),e("a",{attrs:{href:"#2.3.1"}},[t._v("parked")]),t._v(" "),e("a",{attrs:{href:"#2.3.1"}},[t._v("in")]),t._v(" "),e("a",{attrs:{href:"#2.3.1"}},[t._v("the")]),t._v(" "),e("a",{attrs:{href:"#2.3.1"}},[t._v("garage")]),t._v(" #21.")]),t._v(" "),e("p",[e("code",[t._v("*")]),t._v("字符和"),e("code",[t._v(".")]),t._v("字符搭配可以匹配所有的字符"),e("code",[t._v(".*")]),t._v("。 "),e("code",[t._v("*")]),t._v("和表示匹配空格的符号"),e("code",[t._v("\\s")]),t._v("连起来用，如表达式"),e("code",[t._v("\\s*cat\\s*")]),t._v("匹配0或更多个空格开头和0或更多个空格结尾的cat字符串。")]),t._v(" "),e("pre",[t._v('"\\s*cat\\s*" => The fat'),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v(" cat ")])]),t._v("sat on the con"),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("cat")])]),t._v("enation.\n")]),t._v(" "),e("h5",{attrs:{id:"_2-3-3-号"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-3-号"}},[t._v("#")]),t._v(" 2.3.3 "),e("code",[t._v("?")]),t._v(" 号")]),t._v(" "),e("p",[t._v("在正则表达式中元字符 "),e("code",[t._v("?")]),t._v(" 标记在符号前面的字符为可选，即出现 0 或 1 次。\n例如，表达式 "),e("code",[t._v("[T]?he")]),t._v(" 匹配字符串 "),e("code",[t._v("he")]),t._v(" 和 "),e("code",[t._v("The")]),t._v("。")]),t._v(" "),e("pre",[t._v('"[T]he" => '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("The")])]),t._v(" car is parked in the garage.\n")]),t._v(" "),e("pre",[t._v('"[T]?he" => '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("The")])]),t._v(" car is parked in t"),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("he")])]),t._v(" garage.\n")]),t._v(" "),e("h4",{attrs:{id:"_2-4-号"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-号"}},[t._v("#")]),t._v(" 2.4 "),e("code",[t._v("{}")]),t._v(" 号")]),t._v(" "),e("p",[t._v("在正则表达式中 "),e("code",[t._v("{}")]),t._v(" 是一个量词，常用来一个或一组字符可以重复出现的次数。\n例如， 表达式 "),e("code",[t._v("[0-9]{2,3}")]),t._v(" 匹配最少 2 位最多 3 位 0~9 的数字。")]),t._v(" "),e("pre",[t._v('"[0-9]{2,3}" => The number was 9.'),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("999")])]),t._v("7 but we rounded it off to "),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("10")])]),t._v(".0.\n")]),t._v(" "),e("p",[t._v("我们可以省略第二个参数。\n例如，"),e("code",[t._v("[0-9]{2,}")]),t._v(" 匹配至少两位 0~9 的数字。")]),t._v(" "),e("pre",[t._v('"[0-9]{2,}" => The number was 9.'),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("9997")])]),t._v(" but we rounded it off to "),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("10")])]),t._v(".0.\n")]),t._v(" "),e("p",[t._v("如果逗号也省略掉则表示重复固定的次数。\n例如，"),e("code",[t._v("[0-9]{3}")]),t._v(" 匹配3位数字")]),t._v(" "),e("pre",[t._v('"[0-9]{3}" => The number was 9.'),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("999")])]),t._v("7 but we rounded it off to 10.0.\n")]),t._v(" "),e("h4",{attrs:{id:"_2-5-特征标群"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-5-特征标群"}},[t._v("#")]),t._v(" 2.5 "),e("code",[t._v("(...)")]),t._v(" 特征标群")]),t._v(" "),e("p",[t._v("特征标群是一组写在 "),e("code",[t._v("(...)")]),t._v(" 中的子模式。例如之前说的 "),e("code",[t._v("{}")]),t._v(" 是用来表示前面一个字符出现指定次数。但如果在 "),e("code",[t._v("{}")]),t._v(" 前加入特征标群则表示整个标群内的字符重复 N 次。例如，表达式 "),e("code",[t._v("(ab)*")]),t._v(" 匹配连续出现 0 或更多个 "),e("code",[t._v("ab")]),t._v("。")]),t._v(" "),e("p",[t._v("我们还可以在 "),e("code",[t._v("()")]),t._v(" 中用或字符 "),e("code",[t._v("|")]),t._v(" 表示或。例如，"),e("code",[t._v("(c|g|p)ar")]),t._v(" 匹配 "),e("code",[t._v("car")]),t._v(" 或 "),e("code",[t._v("gar")]),t._v(" 或 "),e("code",[t._v("par")]),t._v(".")]),t._v(" "),e("pre",[t._v('"(c|g|p)ar" => The '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("car")])]),t._v(" is "),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("par")])]),t._v("ked in the "),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("gar")])]),t._v("age.\n")]),t._v(" "),e("h4",{attrs:{id:"_2-6-或运算符"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-6-或运算符"}},[t._v("#")]),t._v(" 2.6 "),e("code",[t._v("|")]),t._v(" 或运算符")]),t._v(" "),e("p",[t._v("或运算符就表示或，用作判断条件。")]),t._v(" "),e("p",[t._v("例如 "),e("code",[t._v("(T|t)he|car")]),t._v(" 匹配 "),e("code",[t._v("(T|t)he")]),t._v(" 或 "),e("code",[t._v("car")]),t._v("。")]),t._v(" "),e("pre",[t._v('"(T|t)he|car" => '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("The")])]),t._v(" "),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("car")])]),t._v(" is parked in "),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("the")])]),t._v(" garage.\n")]),t._v(" "),e("h4",{attrs:{id:"_2-7-转码特殊字符"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-7-转码特殊字符"}},[t._v("#")]),t._v(" 2.7 转码特殊字符")]),t._v(" "),e("p",[t._v("反斜线 "),e("code",[t._v("\\")]),t._v(" 在表达式中用于转码紧跟其后的字符。用于指定 "),e("code",[t._v("{ } [ ] / \\ + * . $ ^ | ?")]),t._v(" 这些特殊字符。如果想要匹配这些特殊字符则要在其前面加上反斜线 "),e("code",[t._v("\\")]),t._v("。")]),t._v(" "),e("p",[t._v("例如 "),e("code",[t._v(".")]),t._v(" 是用来匹配除换行符外的所有字符的。如果想要匹配句子中的 "),e("code",[t._v(".")]),t._v(" 则要写成 "),e("code",[t._v("\\.")]),t._v(" 以下这个例子 "),e("code",[t._v("\\.?")]),t._v("是选择性匹配"),e("code",[t._v(".")])]),t._v(" "),e("pre",[t._v('"(f|c|m)at\\.?" => The '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("fat")])]),t._v(" "),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("cat")])]),t._v(" sat on the "),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("mat.")])]),t._v("\n")]),t._v(" "),e("h4",{attrs:{id:"_2-8-锚点"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-8-锚点"}},[t._v("#")]),t._v(" 2.8 锚点")]),t._v(" "),e("p",[t._v("在正则表达式中，想要匹配指定开头或结尾的字符串就要使用到锚点。"),e("code",[t._v("^")]),t._v(" 指定开头，"),e("code",[t._v("$")]),t._v(" 指定结尾。")]),t._v(" "),e("h5",{attrs:{id:"_2-8-1-号"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-8-1-号"}},[t._v("#")]),t._v(" 2.8.1 "),e("code",[t._v("^")]),t._v(" 号")]),t._v(" "),e("p",[e("code",[t._v("^")]),t._v(" 用来检查匹配的字符串是否在所匹配字符串的开头。")]),t._v(" "),e("p",[t._v("例如，在 "),e("code",[t._v("abc")]),t._v(" 中使用表达式 "),e("code",[t._v("^a")]),t._v(" 会得到结果 "),e("code",[t._v("a")]),t._v("。但如果使用 "),e("code",[t._v("^b")]),t._v(" 将匹配不到任何结果。因为在字符串 "),e("code",[t._v("abc")]),t._v(" 中并不是以 "),e("code",[t._v("b")]),t._v(" 开头。")]),t._v(" "),e("p",[t._v("例如，"),e("code",[t._v("^(T|t)he")]),t._v(" 匹配以 "),e("code",[t._v("The")]),t._v(" 或 "),e("code",[t._v("the")]),t._v(" 开头的字符串。")]),t._v(" "),e("pre",[t._v('"(T|t)he" => '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("The")])]),t._v(" car is parked in "),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("the")])]),t._v(" garage.\n")]),t._v(" "),e("pre",[t._v('"^(T|t)he" => '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("The")])]),t._v(" car is parked in the garage.\n")]),t._v(" "),e("h5",{attrs:{id:"_2-8-2-号"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-8-2-号"}},[t._v("#")]),t._v(" 2.8.2 "),e("code",[t._v("$")]),t._v(" 号")]),t._v(" "),e("p",[t._v("同理于 "),e("code",[t._v("^")]),t._v(" 号，"),e("code",[t._v("$")]),t._v(" 号用来匹配字符是否是最后一个。")]),t._v(" "),e("p",[t._v("例如，"),e("code",[t._v("(at\\.)$")]),t._v(" 匹配以 "),e("code",[t._v("at.")]),t._v(" 结尾的字符串。")]),t._v(" "),e("pre",[t._v('"(at\\.)" => The fat c'),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("at.")])]),t._v(" s"),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("at.")])]),t._v(" on the m"),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("at.")])]),t._v("\n")]),t._v(" "),e("pre",[t._v('"(at\\.)$" => The fat cat. sat. on the m'),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("at.")])]),t._v("\n")]),t._v(" "),e("h3",{attrs:{id:"_3-简写字符集"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-简写字符集"}},[t._v("#")]),t._v(" 3. 简写字符集")]),t._v(" "),e("p",[t._v("正则表达式提供一些常用的字符集简写。如下:")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"center"}},[t._v("简写")]),t._v(" "),e("th",{staticStyle:{"text-align":"left"}},[t._v("描述")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v(".")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("除换行符外的所有字符")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("\\w")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("匹配所有字母数字或下划线或汉字或希腊或俄文字符等，等同于 "),e("code",[t._v("[a-zA-Z0-9_]|汉字|希腊俄文字符等")]),e("br"),e("code",[t._v("\\w")]),t._v(" 能不能匹配汉字要视你的操作系统和你的应用环境而定")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("\\W")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("匹配所有非字母数字，即符号，等同于： "),e("code",[t._v("[^\\w]")])])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("\\d")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("匹配数字： "),e("code",[t._v("[0-9]")])])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("\\D")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("匹配非数字： "),e("code",[t._v("[^\\d]")])])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("\\s")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("匹配所有空格字符，等同于： "),e("code",[t._v("[\\t\\n\\f\\r\\v]")])])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("\\S")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("匹配所有非空格字符： "),e("code",[t._v("[^\\s]")])])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("\\f")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("匹配一个换页符")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("\\n")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("匹配一个换行符")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("\\r")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("匹配一个回车符")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("\\t")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("匹配一个制表符")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("\\v")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("匹配一个垂直制表符")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("\\p")]),t._v(" "),e("td",{staticStyle:{"text-align":"left"}},[t._v("匹配 CR/LF（等同于 "),e("code",[t._v("\\r\\n")]),t._v("），用来匹配 DOS 行终止符")])])])]),t._v(" "),e("h3",{attrs:{id:"_4-零宽度断言-前后预查"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-零宽度断言-前后预查"}},[t._v("#")]),t._v(" 4. 零宽度断言（前后预查）")]),t._v(" "),e("p",[t._v("先行断言和后发断言都属于"),e("strong",[t._v("非捕获簇")]),t._v("（不捕获文本 ，也不针对组合计进行计数）。 先行断言用于判断所匹配的格式是否在另一个确定的格式之前，匹配结果不包含该确定格式（仅作为约束）。")]),t._v(" "),e("p",[t._v("例如，我们想要获得所有跟在 "),e("code",[t._v("$")]),t._v(" 符号后的数字，我们可以使用正后发断言 "),e("code",[t._v("(?<=\\$)[0-9\\.]*")]),t._v("。 这个表达式匹配 "),e("code",[t._v("$")]),t._v(" 开头，之后跟着 "),e("code",[t._v("0,1,2,3,4,5,6,7,8,9,.")]),t._v(" 这些字符可以出现大于等于 0 次。")]),t._v(" "),e("p",[t._v("零宽度断言如下：")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("符号")]),t._v(" "),e("th",[t._v("描述")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("?=")]),t._v(" "),e("td",[t._v("正先行断言-存在")])]),t._v(" "),e("tr",[e("td",[t._v("?!")]),t._v(" "),e("td",[t._v("负先行断言-排除")])]),t._v(" "),e("tr",[e("td",[t._v("?<=")]),t._v(" "),e("td",[t._v("正后发断言-存在")])]),t._v(" "),e("tr",[e("td",[t._v("?<!")]),t._v(" "),e("td",[t._v("负后发断言-排除")])])])]),t._v(" "),e("h5",{attrs:{id:"_4-1-正先行断言"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-正先行断言"}},[t._v("#")]),t._v(" 4.1 "),e("code",[t._v("?=...")]),t._v(" 正先行断言")]),t._v(" "),e("p",[e("code",[t._v("?=...")]),t._v(" 正先行断言，表示第一部分表达式之后必须跟着 "),e("code",[t._v("?=...")]),t._v("定义的表达式。")]),t._v(" "),e("p",[t._v("返回结果只包含满足匹配条件的第一部分表达式。 "),e("strong",[t._v("定义一个正先行断言要使用 "),e("code",[t._v("()")])]),t._v("。在括号内部使用一个问号和等号： "),e("code",[t._v("(?=...)")]),t._v("。")]),t._v(" "),e("p",[t._v("正先行断言的内容写在括号中的等号后面。 例如，表达式 "),e("code",[t._v("(T|t)he(?=\\sfat)")]),t._v(" 匹配 "),e("code",[t._v("The")]),t._v(" 和 "),e("code",[t._v("the")]),t._v("，在括号中我们又定义了正先行断言 "),e("code",[t._v("(?=\\sfat)")]),t._v(" ，即 "),e("code",[t._v("The")]),t._v(" 和 "),e("code",[t._v("the")]),t._v(" 后面紧跟着 "),e("code",[t._v("(空格)fat")]),t._v("。")]),t._v(" "),e("pre",[t._v('"(T|t)he(?=\\sfat)" => '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("The")])]),t._v(" fat cat sat on the mat.\n")]),t._v(" "),e("h5",{attrs:{id:"_4-2-负先行断言"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-负先行断言"}},[t._v("#")]),t._v(" 4.2 "),e("code",[t._v("?!...")]),t._v(" 负先行断言")]),t._v(" "),e("p",[t._v("负先行断言 "),e("code",[t._v("?!")]),t._v(" 用于筛选所有匹配结果，筛选条件为 其后不跟随着断言中定义的格式。\n"),e("code",[t._v("正先行断言")]),t._v("  定义和 "),e("code",[t._v("负先行断言")]),t._v(" 一样，区别就是 "),e("code",[t._v("=")]),t._v(" 替换成 "),e("code",[t._v("!")]),t._v(" 也就是 "),e("code",[t._v("(?!...)")]),t._v("。")]),t._v(" "),e("p",[t._v("表达式 "),e("code",[t._v("(T|t)he(?!\\sfat)")]),t._v(" 匹配 "),e("code",[t._v("The")]),t._v(" 和 "),e("code",[t._v("the")]),t._v("，且其后不跟着 "),e("code",[t._v("(空格)fat")]),t._v("。")]),t._v(" "),e("pre",[t._v('"(T|t)he(?!\\sfat)" => The fat cat sat on '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("the")])]),t._v(" mat.\n")]),t._v(" "),e("h5",{attrs:{id:"_4-3-正后发断言"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-正后发断言"}},[t._v("#")]),t._v(" 4.3 "),e("code",[t._v("?<= ...")]),t._v(" 正后发断言")]),t._v(" "),e("p",[t._v("正后发断言 记作"),e("code",[t._v("(?<=...)")]),t._v(" 用于筛选所有匹配结果，筛选条件为 其前跟随着断言中定义的格式。\n例如，表达式 "),e("code",[t._v("(?<=(T|t)he\\s)(fat|mat)")]),t._v(" 匹配 "),e("code",[t._v("fat")]),t._v(" 和 "),e("code",[t._v("mat")]),t._v("，且其前跟着 "),e("code",[t._v("The")]),t._v(" 或 "),e("code",[t._v("the")]),t._v("。")]),t._v(" "),e("pre",[t._v('"(?<=(T|t)he\\s)(fat|mat)" => The '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("fat")])]),t._v(" cat sat on the "),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("mat")])]),t._v(".\n")]),t._v(" "),e("h5",{attrs:{id:"_4-4-负后发断言"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-4-负后发断言"}},[t._v("#")]),t._v(" 4.4 "),e("code",[t._v("?<!...")]),t._v(" 负后发断言")]),t._v(" "),e("p",[t._v("负后发断言 记作 "),e("code",[t._v("(?<!...)")]),t._v(" 用于筛选所有匹配结果，筛选条件为 其前不跟随着断言中定义的格式。\n例如，表达式 "),e("code",[t._v("(?<!(T|t)he\\s)(cat)")]),t._v(" 匹配 "),e("code",[t._v("cat")]),t._v("，且其前不跟着 "),e("code",[t._v("The")]),t._v(" 或 "),e("code",[t._v("the")]),t._v("。")]),t._v(" "),e("pre",[t._v('"(?<!(T|t)he\\s)(cat)" => The cat sat on '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("cat")])]),t._v(".\n")]),t._v(" "),e("h3",{attrs:{id:"_5-标志"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-标志"}},[t._v("#")]),t._v(" 5. 标志")]),t._v(" "),e("p",[t._v("标志也叫模式修正符，因为它可以用来修改表达式的搜索结果。\n这些标志可以任意的组合使用，它也是整个正则表达式的一部分。")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",{staticStyle:{"text-align":"center"}},[t._v("标志")]),t._v(" "),e("th",[t._v("描述")])])]),t._v(" "),e("tbody",[e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("i")]),t._v(" "),e("td",[t._v("忽略大小写。")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("g")]),t._v(" "),e("td",[t._v("全局搜索。")])]),t._v(" "),e("tr",[e("td",{staticStyle:{"text-align":"center"}},[t._v("m")]),t._v(" "),e("td",[t._v("多行修饰符：锚点元字符 "),e("code",[t._v("^")]),t._v(" "),e("code",[t._v("$")]),t._v(" 工作范围在每行的起始。")])])])]),t._v(" "),e("h4",{attrs:{id:"_5-1-忽略大小写-case-insensitive"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-1-忽略大小写-case-insensitive"}},[t._v("#")]),t._v(" 5.1 忽略大小写（Case Insensitive）")]),t._v(" "),e("p",[t._v("修饰语 "),e("code",[t._v("i")]),t._v(" 用于忽略大小写。\n例如，表达式 "),e("code",[t._v("/The/gi")]),t._v(" 表示在全局搜索 "),e("code",[t._v("The")]),t._v("，在后面的 "),e("code",[t._v("i")]),t._v(" 将其条件修改为忽略大小写，则变成搜索 "),e("code",[t._v("the")]),t._v(" 和 "),e("code",[t._v("The")]),t._v("，"),e("code",[t._v("g")]),t._v(" 表示全局搜索。")]),t._v(" "),e("pre",[t._v('"The" => '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("The")])]),t._v(" fat cat sat on the mat.\n")]),t._v(" "),e("pre",[t._v('"/The/gi" => '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("The")])]),t._v(" fat cat sat on "),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("the")])]),t._v(" mat.\n")]),t._v(" "),e("h4",{attrs:{id:"_5-2-全局搜索-global-search"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-2-全局搜索-global-search"}},[t._v("#")]),t._v(" 5.2 全局搜索（Global search）")]),t._v(" "),e("p",[t._v("修饰符 "),e("code",[t._v("g")]),t._v(" 常用于执行一个全局搜索匹配，即（不仅仅返回第一个匹配的，而是返回全部）。\n例如，表达式 "),e("code",[t._v("/.(at)/g")]),t._v(" 表示搜索 任意字符（除了换行）+ "),e("code",[t._v("at")]),t._v("，并返回全部结果。")]),t._v(" "),e("pre",[t._v('"/.(at)/" => The '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("fat")])]),t._v(" cat sat on the mat.\n")]),t._v(" "),e("pre",[t._v('"/.(at)/g" => The '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("fat")])]),t._v(" "),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("cat")])]),t._v(" "),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("sat")])]),t._v(" on the "),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("mat")])]),t._v(".\n")]),t._v(" "),e("h4",{attrs:{id:"_5-3-多行修饰符-multiline"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5-3-多行修饰符-multiline"}},[t._v("#")]),t._v(" 5.3 多行修饰符（Multiline）")]),t._v(" "),e("p",[t._v("多行修饰符 "),e("code",[t._v("m")]),t._v(" 常用于执行一个多行匹配。")]),t._v(" "),e("p",[t._v("像之前介绍的 "),e("code",[t._v("(^,$)")]),t._v(" 用于检查格式是否是在待检测字符串的开头或结尾。但我们如果想要它在每行的开头和结尾生效，我们需要用到多行修饰符 "),e("code",[t._v("m")]),t._v("。")]),t._v(" "),e("p",[t._v("例如，表达式 "),e("code",[t._v("/at(.)?$/gm")]),t._v(" 表示小写字符 "),e("code",[t._v("a")]),t._v(" 后跟小写字符 "),e("code",[t._v("t")]),t._v(" ，末尾可选除换行符外任意字符。根据 "),e("code",[t._v("m")]),t._v(" 修饰符，现在表达式匹配每行的结尾。")]),t._v(" "),e("pre",[t._v('"/.at(.)?$/" => The fat\n                cat sat\n                on the '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("mat.")])]),t._v("\n")]),t._v(" "),e("pre",[t._v('"/.at(.)?$/gm" => The '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("fat")])]),t._v("\n                  cat "),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("sat")])]),t._v("\n                  on the "),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("mat.")])]),t._v("\n")]),t._v(" "),e("h3",{attrs:{id:"_6-贪婪匹配与惰性匹配-greedy-vs-lazy-matching"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_6-贪婪匹配与惰性匹配-greedy-vs-lazy-matching"}},[t._v("#")]),t._v(" 6. 贪婪匹配与惰性匹配（Greedy vs lazy matching）")]),t._v(" "),e("p",[t._v("正则表达式默认采用贪婪匹配模式，在该模式下意味着会匹配尽可能长的子串。我们可以使用 "),e("code",[t._v("?")]),t._v(" 将贪婪匹配模式转化为惰性匹配模式。")]),t._v(" "),e("pre",[t._v('"/(.*at)/" => '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("The fat cat sat on the mat")])]),t._v(". ")]),t._v(" "),e("pre",[t._v('"/(.*?at)/" => '),e("a",{attrs:{href:"#learn-regex"}},[e("strong",[t._v("The fat")])]),t._v(" cat sat on the mat. ")]),t._v(" "),e("h3",{attrs:{id:"简单实验"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#简单实验"}},[t._v("#")]),t._v(" 简单实验")]),t._v(" "),e("h4",{attrs:{id:"匹配所有正数和负数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#匹配所有正数和负数"}},[t._v("#")]),t._v(" 匹配所有正数和负数")]),t._v(" "),e("p",[t._v("Example:")]),t._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("123\n123.2\n-123\n-123.1\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br")])]),e("p",[t._v("Regex:")]),t._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("-?\\d+(\\.\\d+)?\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br")])]),e("p",[e("code",[t._v("-?")]),t._v("匹配前面的负号， "),e("code",[t._v("\\d+")]),t._v("表示必须带有数字，"),e("code",[t._v("(\\.\\d+)?")]),t._v("表示后面的点+小数位  ?代表不是必须")]),t._v(" "),e("h4",{attrs:{id:"匹配日期规则"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#匹配日期规则"}},[t._v("#")]),t._v(" 匹配日期规则")]),t._v(" "),e("p",[t._v("Example:")]),t._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("2020-1-1\n2019-12-12\n2020-01-01\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br")])]),e("p",[t._v("Regex:")]),t._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("^[1-2]?\\d{1,3}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\\d|3[01])$\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br")])]),e("h4",{attrs:{id:"匹配邮箱地址"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#匹配邮箱地址"}},[t._v("#")]),t._v(" 匹配邮箱地址")]),t._v(" "),e("p",[t._v("Example:")]),t._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("cwyu123@qq.com\n901237niqd@163.cn\nfengyuwusong@fengyuwusong.cn\n\n// @前面必须有内容且只能是字母(大小写),数字,下划线,减号,点；\n// @和最后一个点之间必须有内容且只能是字母(大小写),数字,点,减号,且两个点不能挨着；\n// 最后一个点之后必须有内容且内容只能是字母(大小写),数字。长度为大于等于2,小于等于6。\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br")])]),e("p",[t._v("Regex:")]),t._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("^[a-zA-Z0-9_\\-\\.]+@[a-zA-Z0-9\\-]*\\.*[a-zA-Z0-9\\-]+\\.[a-zA-Z0-9]{2,6}$\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br")])]),e("h4",{attrs:{id:"匹配html标签"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#匹配html标签"}},[t._v("#")]),t._v(" 匹配Html标签")]),t._v(" "),e("p",[t._v("Example:")]),t._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("从以下标签匹配:\n<a>wahaha</a>\n<b>banana</b>\n<h1>qqxing</h1>\n\n内容:\nwahaha\nbanana\nqqxing\n\n标签:\na\nb\nh1\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br"),e("span",{staticClass:"line-number"},[t._v("8")]),e("br"),e("span",{staticClass:"line-number"},[t._v("9")]),e("br"),e("span",{staticClass:"line-number"},[t._v("10")]),e("br"),e("span",{staticClass:"line-number"},[t._v("11")]),e("br"),e("span",{staticClass:"line-number"},[t._v("12")]),e("br"),e("span",{staticClass:"line-number"},[t._v("13")]),e("br"),e("span",{staticClass:"line-number"},[t._v("14")]),e("br")])]),e("p",[t._v("Regex:")]),t._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('内容:\n(?<=>)\\w+(?=<)\n\n"<a>wahaha</a>" => "wahaha"\n\n标签:\n(?<=</)\\w+(?=>)\n"<a>wahaha</a>" => "a"\n')])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br"),e("span",{staticClass:"line-number"},[t._v("8")]),e("br")])])])}),[],!1,null,null,null);e.default=v.exports}}]);