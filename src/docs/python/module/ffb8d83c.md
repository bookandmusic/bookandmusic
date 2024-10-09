---
created: 2023-08-03T13:23:35.000Z
updated: 2024-10-08T03:11:37.000Z
article: false
order: 3
title: RE模块
---
re 模块是 python 独有的匹配字符串的模块，该模块中提供的很多功能是基于正则表达式实现的，而正则表达式是对字符串进行模糊匹配，提取自己需要的字符串部分，他对所有的语言都通用。

> 注意：

* re 模块是 python 独有的
* 正则表达式所有编程语言都可以使用

## 正则规则

### 规则

####  字符

|元字符|说明|
| :-----| ----------------------------------------------|
|`.`|匹配除换行符以外的任意字符|
|`\w`|匹配字母或数字或下划线|
|`\s`|匹配任意的空白符|
|`\d`|匹配数字|
|`\n`|匹配一个换行符|
|`\t`|匹配一个制表符|
|`\b`|匹配一个单词的结尾|
|`^`|匹配字符串的开始|
|`$`|匹配字符串的结尾|
|`\W`|匹配非字母或数字或下划线|
|`\D`|匹配非数字|
|`\S`|匹配非空白符|
|`[...]`|匹配字符组中的任一字符|
|`[^...]`|匹配除了字符组中字符的所有任一字符|
|`a|b`|
|`(ab)`|匹配括号内的表达式，即将括号中字符作为一个分组|
|`\num`|引用分组num匹配到的字符串|

#### 量词

|量词|说明|
| ----| ------------|
|`*`|零次或无限次|
|`+`|一次或无限次|
|`?`|零次或一次|
|`{n}`|n次|
|`{n,}`|n次或无限次|
|`{n,m}`|n到m次|

### 案例

#### 单字符匹配

|正则|待匹配字符|匹配结果|说明|
| ----| ----------| ---------| ----------------------------------------------------------|
|`[a-z]`|abacad|a<br />b<br />a<br />c<br />a<br />d|匹配到6处小写字符|
|`a.`|abacad|ab<br />ac<br />ad|匹配所有"a."的字符|
|`^a.`|abacad|ab|只从开头匹配"a."|
|`a.$`|abacad|ad|只匹配结尾的"a.$"|
|`a.?`|abefacgada|ab<br />ac<br />ad<br />a|?表示重复零次或一次，即只匹配"a"后面零个或一个任意字符。|
|`a.*`|abefacgad|abefacgad|*表示重复零次或多次，即匹配"a"后面零个或无限个任意字符。|
|`a.+`|abefacgad|abefacgad|+表示重复一次或多次，即只匹配"a"后面一个或无限个任意字符。|
|`a.{1,2}`|abefacgad|abe<br />acg<br />ad|{1,2}匹配1到2次任意字符。|

####  字符集匹配

|正则|待匹配字符|匹配结果|说明|
| ----| ----------| ---------| -----------------------------------|
|`a[befcgd]*`|abefacgad|abef<br />acg<br />ad|表示匹配"a"后面`[befcgd]`中的任一字符任意次|
|`a[^f]*`|abefacgad|abe<br />acgad|表示匹配一个不是"f"的字符任意次|
|`[\d]`|31sa32dsa|3<br />1<br />3<br />2|表示匹配任意一个数字，匹配到4个结果|
|`[\d]+`|31sa32dsa|31<br />32|表示匹配任意个数字，匹配到2个结果|

####  分组匹配

身份证号码是一个长度为 15 或 18 个字符的字符串，如果是 15 位则全部由数字组成，首位不能为 0；如果是 18 位，则前 17 位全部是数字，末位可能是数字或 x，下面我们尝试用正则来表示：

|正则|待匹配字符|匹配结果|说明|
| --------------------| ------------------| ------------------| ---------------------------------------------------------------------------------------|
|`^[1-9]\d{13,16}[0-9x]$`|110101198001017032|110101198001017032|表示可以匹配一个正确的身份证号|
|`^[1-9]\d{13,16}[0-9x]$`|1101011980010170|1101011980010170|表示也可以匹配这串数字，但这并不是一个正确的身份证号码，它是一个16位的数字|
|`^[1-9]\d{14}(\d{2}[0-9x])?$`|1101011980010170|False|现在不会匹配错误的身份证号了，`()`表示分组，将`\d{2}[0-9x]`分成一组，就可以整体约束他们出现的次数为0-1次|
|`^([1-9]\d{16}[0-9x]|[1-9]\d{14})$`|110105199812067023|110105199812067023|

####  转义符`\`

在正则表达式中，有很多有特殊意义的是元字符，比如 `\n` 和 `\s` 等，如果要在正则中匹配正常的 `"\n"` 而不是 `"换行符"` 就需要对 `"\"` 进行转义，变成`"\\"`。

在 python 中，无论是正则表达式，还是待匹配的内容，都是以字符串的形式出现的，在字符串中 `\` 也有特殊的含义，本身还需要转义。所以如果匹配一次 `"\n"`, 字符串中要写成`'\\n'`，那么正则里就要写成 `"\\\\n"`, 这样就太麻烦了。这个时候我们就用到了 `r'\n'`这个概念，此时的正则是 `r'\\n'`就可以了。

|正则|待匹配字符|匹配 结果|说明|
| ----| ----------| ---------| ----------------------------------------------------------------------|
|`\n`|`\n`|False|因为在正则表达式中`\`是有特殊意义的字符，所以要匹配`\n`本身，用表达式`\n`无法匹配|
|`\\n`|`\n`|True|转义`\`之后变成`\\`，即可匹配|
|`\\\\n`|`\\n`|True|如果在python中，字符串中的`\`也需要转义，所以每一个字符串`\`又需要转义一次|
|`r'\\n'`|`r'\n'`|True|在字符串之前加r，让整个字符串不转义|

#### 贪婪匹配

贪婪匹配：在满足匹配时，匹配尽可能长的字符串，默认情况下，采用贪婪匹配

注意：前面的 `*`,`+`等都是贪婪匹配，也就是尽可能匹配，后面加? 号使其变成惰性匹配(非贪婪匹配)

|正则|待匹配字符|匹配结果|说明|
| ----| ----------| --------| --------------------------------------------------------------|
|`a.*?`|abefacgad|a<br />a<br />a|加上？为将贪婪匹配模式转为非贪婪匹配模式，会匹配尽量短的字符串|
|`a.+?`|abefacgad|ab<br />ac<br />ad||

几个常用的非贪婪匹配 Pattern

```
*? 重复任意次，但尽可能少重复
+? 重复1次或更多次，但尽可能少重复
?? 重复0次或1次，但尽可能少重复
{n,m}? 重复n到m次，但尽可能少重复
{n,}? 重复n次以上，但尽可能少重复
```

.*? 的用法

```
. 是任意字符
* 是取 0 至 无限长度
? 是非贪婪模式。
何在一起就是 取尽量少的任意字符，一般不会这么单独写，他大多用在：
.*?x

就是取前面任意长度的字符，直到一个x出现
```

re模块

---

### 常量、属性

> `re.A`(re.ASCII)

让 `\w`，`\W`，`\b`，`\B`，`\d`，`\D`，`\s` 和 `\S` 执行 ASCII - 只匹配完整的 Unicode 匹配代替。这仅对 Unicode 模式有意义，而对于字节模式则忽略。

> `re.I`(re.IGNORECASE)

执行不区分大小写的匹配；类似的，表达式`[A-Z]`也将匹配小写字母。

> `re.L`(re.LOCALE)

让 `\w`，`\W`，`\b`，`\B` 和 区分大小写的匹配 取决于当前的语言环境。该标志只能与字节模式一起使用。

不建议使用此标志，因为语言环境机制非常不可靠，它一次只能处理一种 “区域性”，并且仅适用于 8 位语言环境。

默认情况下，Python 3 中已为 Unicode(str)模式启用了 Unicode 匹配，并且能够处理不同的语言环境/语言。

> `re.M`(re.MULTILINE)

指定时，模式字符`'^'`在字符串的开头和每行的开头(紧随每个换行符之后)匹配；模式字符`'$'`在字符串的末尾和每行的末尾(紧接在每个换行符之前)匹配。

默认情况下，`'^'` 仅在字符串的开头，`'$'`仅在字符串的末尾和字符串末尾的换行符(如果有)之前立即匹配。

> `re.S`(re.DOTALL)

使`'.'`特殊字符与任何字符都匹配，包括换行符；没有此标志，`'.'`将匹配除换行符以外的任何内容。

### 常用方法

> `re.match(pattern, string, flags=0)`

如果字符串开头的零个或多个字符与正则表达式模式匹配，则返回相应的匹配对象。如果字符串与模式不匹配，则返回None。

```python
In [1]: import re

In [4]: re.match('\d','1abcade')
Out[4]: <re.Match object; span=(0, 1), match='1'>

In [5]: re.match('\d','a1bcade')

In [6]: re.match(r"0$|100$|[1-9]\d{0,1}$", '100')  # 匹配0-100的数字
Out[6]: <re.Match object; span=(0, 3), match='100'>

In [7]: re.match(r"0$|100$|[1-9]\d{0,1}$", '0')
Out[7]: <re.Match object; span=(0, 1), match='0'>

In [8]: re.match(r"0$|100$|[1-9]\d{0,1}$", '20')
Out[8]: <re.Match object; span=(0, 2), match='20'>

In [9]: re.match(r'<([^>]+?)>.*</(\1)>', '<b>hello</b>')  # 后面的分组引用分组1的值，也就是后面的分组必须和前面的分组一样才可以
Out[9]: <re.Match object; span=(0, 12), match='<b>hello</b>'>

In [10]: re.match(r'<([^>]+?)>.*</(\1)>', '<b>hello</p>')

In [11]: re.match(r'<(?P<name>[^>]+?)>.*</(?P=name)>', '<b>hello</b>')  # 前面的分组起名为name，后面的分组必须和名为name的分组值一样才可以
Out[12]: <re.Match object; span=(0, 12), match='<b>hello</b>'>

In [13]: re.match(r'<(?P<name>[^>]+?)>.*</(?P=name)>', '<b>hello</p>')

In [14]: re.match('\d','1abcade').group()  # 通过调用group()方法得到匹配的字符串,如果匹配结果为None，则调用group()方法会抛出异常。
Out[14]: '1'

In [15]: re.match(r"(a.)+", "a1b2c3").group(1)   # 可以通过指定序号，获取对应组的匹配结果
Out[15]: 'a1'

In [16]: re.match(r"(..)+", "a1b2c3").group(1)  # 一个组匹配成功多次，就只返回最后一个匹配
Out[16]: 'c3'

In [17]: res = re.match(r"(\w+) (\w+)", "Isaac Newton, physicist")

In [18]: res.group(1)  # 可以通过指定序号，获取对应组的匹配结果
Out[18]: 'Isaac'

In [19]: res.group(2)
Out[19]: 'Newton'

In [20]: res.group(1, 2)
Out[20]: ('Isaac', 'Newton')

In [21]: res.groups()  # 返回一个元组，包含所有匹配的子组
Out[21]: ('Isaac', 'Newton')

In [22]: res = re.match(r"(\w+) (\w+)", "Isaac Newton, physicist") 

In [23]: res[0]   # 这个等价于 m.group(n)。这允许更方便的引用一个匹配结果
Out[23]: 'Isaac Newton'

In [24]: res[1]
Out[24]: 'Isaac'

In [25]: res[2]
Out[25]: 'Newton'  

In [26]: res = re.match(r"(\d+)\.?(\d+)?", "24")

In [27]: res.groups(default=None)  # default参数用于匹配不到结果的组；默认为 None
Out[27]: ('24', None)

In [28]: res.groups(default='0')  # 指定default的值为0，当组匹配不到值时，就是默认值0
Out[28]: ('24', '0')

In [29]: res = re.match(r"(?P<integer>\d+)\.?(?P<decimal>\d+)?", "24") 

In [30]: res.groupdict()  # 返回一个字典，包含了所有的 命名 子组。key就是组名。default参数用于匹配不到结果的组；默认为 None
Out[31]: {'integer': '24', 'decimal': None}

In [32]: res.groupdict(default=0)  # 指定default的值为0，当组匹配不到值时，就是默认值0
Out[32]: {'integer': '24', 'decimal': 0}
```

> `re.search(pattern, string, flags=0)`

扫描字符串以查找正则表达式模式产生匹配项的第一个位置 ，然后返回相应的 match 对象。如果字符串中没有位置与模式匹配，则返回None。

```python
In [1]: import re

In [11]: re.search('\d','a1bcade').group()
Out[11]: '1'

In [12]: re.search('\d','a1b3cade').group()
Out[12]: '1'

In [61]: re.search('^\d','a1b3cade')  # 以'^'开头的正则表达式可用于 search() ，限制必须从字符串开头匹配，此时作用类似于match()

In [62]: re.search('\d','a1b3cade')
Out[62]: <re.Match object; span=(1, 2), match='1'>    
```

> `re.compile(pattern, flags=0)`

将正则表达式模式编译为正则表达式对象，可用于 `match()`，`search()` 以及其他re模块的方法进行正则匹配。

```python
In [1]: import re

In [14]: reg = re.compile(r'[\d]+')

In [16]: re.match(reg,'12asd23').group()
Out[16]: '12'

In [17]: re.search(reg,'asd23').group()
Out[17]: '23'
```

> `re.fullmatch(pattern, string, flags=0)`

如果整个字符串与正则表达式模式匹配，则返回相应的 match 对象。如果字符串与模式不匹配，则返回None。

```python
In [1]: import re

In [25]: re.fullmatch('\w+','abcade%')

In [26]: re.fullmatch('\w+','abcade')
Out[26]: <re.Match object; span=(0, 6), match='abcade'>
```

> `re.split(pattern, string, maxsplit=0, flags=0)`

通过出现模式来拆分字符串。

```python
In [1]: import re

In [28]: re.split(r'\W+', 'Words, words, words.')
Out[28]: ['Words', 'words', 'words', '']

In [29]: re.split(r'(\W+)', 'Words, words, words.')  # 如果在 pattern 中使用了捕获括号，那么模式中所有组的文本也将作为结果列表的一部分返回
Out[29]: ['Words', ', ', 'words', ', ', 'words', '.', '']

In [30]: re.split(r'\W+', 'Words, words, words.', 1)  # 如果 maxsplit 不为零，则最多会发生 maxsplit 分割，并将字符串的其余部分作为列表的最后一个元素返回
Out[30]: ['Words', 'words, words.']

In [31]: re.split('[a-f]+', '0a3B9', flags=re.IGNORECASE)
Out[31]: ['0', '3', '9']

In [32]: re.split(r'(\W+)', '...words, words...')   # 如果分隔符在字符串的开头匹配，则结果将从空字符串开始。字符串的末尾也是如此
Out[32]: ['', '...', 'words', ', ', 'words', '...', '']

In [33]: re.split(r'\W+', '...words, words...')
Out[33]: ['', 'words', 'words', '']

In [34]: re.split('[ab]', 'abcd')  # 先按'a'分割得到''和'bcd',在对''和'bcd'分别按'b'分割
Out[34]: ['', '', 'cd']
```

> `re.findall(pattern, string, flags=0)`

以 string 列表形式返回 string 中 pattern 的所有非重叠匹配项。从左到右扫描该字符串，并以找到的顺序返回匹配项。如果该模式中存在一个或多个组，则返回一个组列表；否则，返回一个列表。如果模式包含多个组，则这将是一个元组列表。空匹配项包含在结果中。

```python
In [1]: import re

In [35]: re.findall('a', 'This is a beautiful place!')
Out[35]: ['a', 'a', 'a']
```

> `re.finditer(pattern, string, flags=0)`

返回一个迭代器，该迭代器在 string 类型的 RE 模式的所有非重叠匹配中产生匹配对象。 从左到右扫描该字符串，并以找到的顺序返回匹配项。空匹配项包含在结果中。

```python
In [1]: import re

In [36]: re.finditer('a', 'This is a beautiful place!')
Out[36]: <callable_iterator at 0x111735750>

In [37]: res = re.finditer('a', 'This is a beautiful place!')

In [38]: [i.group() for i in res]
Out[38]: ['a', 'a', 'a']
```

> `re.sub(pattern, repl, string, count=0, flags=0)`

返回 用 repl 替换字符串中最左边的不重叠模式所获得的字符串。如果找不到该模式，则返回的字符串不变。 repl 可以是字符串或函数；如果是字符串，则处理其中的任何反斜杠转义。即，将其转换为单个换行符，将其转换为回车，依此类推。count 参数表示将匹配到的内容进行替换的次数

```python
In [1]: import re

In [43]: re.sub(r'\r', r'\\r', 'GET HTTP/1.1\n200 OK\n')
Out[43]: 'GET HTTP/1.1\n200 OK\n'

In [44]: re.sub(r'\n', r'\\n', 'GET HTTP/1.1\n200 OK\n')
Out[44]: 'GET HTTP/1.1\\n200 OK\\n'

In [47]: re.sub(r'\\n', r'\\\\n', r'GET HTTP/1.1\n200 OK\n')
Out[47]: 'GET HTTP/1.1\\\\n200 OK\\\\n'

In [48]: re.sub('\d', 'S', 'abc12jh45li78', 2) #将匹配到的数字替换成S,替换2个
Out[48]: 'abcSSjh45li78'

In [49]: re.sub('\d', 'S', 'abc12jh45li78') #将匹配到所有的数字替换成S
Out[49]: 'abcSSjhSSliSS'    
```

> `re.subn(pattern, repl, string, count=0, flags=0)`

执行与相同的操作 sub()，但返回一个元组`(new_string, number_of_subs_made)`。

```python
In [1]: import re

In [50]: re.subn('\d', 'S', 'abc12jh45li78', 3)
Out[50]: ('abcSSjhS5li78', 3)
```

> `re.escape(pattern)`

得到字符串的原始表现形式。

```python
In [1]: import re

In [55]: re.escape('GET HTTP/1.1\n200 OK\n')
Out[55]: 'GET\\ HTTP/1\\.1\\\n200\\ OK\\\n'
```
