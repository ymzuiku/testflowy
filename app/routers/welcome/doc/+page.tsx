import { UxDocument, UxDocumentItem } from "solid-ux/UxDocument";
import { UxSvg } from "solid-ux/UxSvg";

import { BiRegularQuestionMark } from "solid-icons/bi";
import { RiDeviceInstallLine, RiSystemShieldKeyholeLine, RiUserTeamLine } from "solid-icons/ri";
import { TbTestPipe } from "solid-icons/tb";
import { routers } from "../..";
import { i18n } from "../../../i18n";

export const docData: UxDocumentItem[] = [
  {
    Icon: RiDeviceInstallLine,
    title: i18n.安装,
    items: [
      {
        label: i18n.为什么使用Testflowy,
        content: [
          {
            kind: "empty",
            html: "h-10",
          },
          {
            kind: "h3",
            html: i18n.Testflowy是什么,
          },
          {
            kind: "p",
            html: i18n.Testflowy励志成为一个最简单的Web自动化测试平台,
          },
          {
            kind: "h3",
            html: i18n.Testflowy对比传统的手动编写测试,
          },
          {
            kind: "p",
            html: i18n.对于手动编写集成测试代码一直有以下困难点,
          },
          {
            kind: "ul",
            htmls: [
              i18n.如何快速培训工程师学习编写自动化测试代码,
              i18n.如何降低集成测试代码编写的成本,
              i18n.如何让自动化测试更好的在整个团队进行协作,
            ],
          },
          {
            kind: "p",
            html: i18n.为了更好的在整个团队进行协作您需要搭建一套自动化测试平台这大概需要个资深的测试工程师花费数十天的工作量,
          },
          {
            kind: "p",
            html: i18n.使用Testflowy您很轻松的解决了以上问题,
          },
          {
            kind: "ul",
            htmls: [
              i18n.工程师不需要编写测试代码,
              i18n.更简单的聚合复制Mock您的测试任务,
              i18n.通过Testflowy团队账号体系让自动化测试在整个团队进行协作,
            ],
          },
          {
            kind: "h3",
            html: i18n.Testflowy的优点,
          },
          {
            kind: "p",
            html: i18n.使用Testflowy您只需要注册就获得了一套自动化测试平台工程师和测试人员不需要编写任何代码,
          },
          {
            kind: "h3",
            html: i18n.Testflowy的缺点,
          },
          {
            kind: "p",
            html: i18n.Testflowy基于真实浏览器环境它的特点是没有搭建成本,
          },
        ],
      },
      {
        label: i18n.注册平台账号,
        content: [
          {
            kind: "p",
            html: i18n.开始使用Testflowy您需要注册一个账号在官网首页或者点击以下链接即可跳转到注册页面,
          },
          {
            kind: "buttonLink",
            html: i18n.点我进行注册,
            src: "/#/login/register",
          },
          {
            kind: "h4",
            html: i18n.填写邮箱然后点击注册,
          },
          {
            kind: "img",
            src: "/doc-imgs/login.png",
          },
          {
            kind: "h4",
            html: i18n.填写邮箱收到的验证码设定密码,
          },
          {
            kind: "img",
            src: "/doc-imgs/login2.png",
          },
          {
            kind: "h4",
            html: i18n.注册成功自动登录到Dashboard,
          },
          {
            kind: "img",
            src: "/doc-imgs/login3.png",
          },
          {
            kind: "p",
            html: i18n.您已注册好账号可以继续下一步了,
          },
        ],
      },
      {
        label: i18n.启用测试,
        content: [
          {
            kind: "h2",
            html: i18n.嵌入TestflowySDK,
          },
          {
            kind: "p",
            html: i18n.Testflowy提供了种方案启用测试您可以选择以下任意一种方案,
          },
          {
            kind: "ul",
            htmls: [i18n.在测试网站中嵌入代码, i18n.安装TestflowyChrome插件],
          },
          {
            kind: "h3",
            html: i18n.方案在测试网站中嵌入代码,
          },
          {
            kind: "p",
            html: i18n.直接在测试网站中嵌入SDK可以很好让团队任何成员都参与测试我们建议您优先使用这种方式,
          },
          {
            kind: "p",
            html: i18n.在HTML中嵌入以下代码,
          },
          {
            kind: "code",
            height: "200px",
            language: "html",
            html: `
<script>
 (function (d) {
    var s = d.createElement("script");
    s.src = "https://testflowy.com/sdk.js";
    s.async = true;
    (d.head || d.body).appendChild(s);
  })(document);
</script>
            `,
          },
          {
            kind: "h3",
            html: i18n.方案Chrome浏览器安装Tampermonkey插件,
          },
          {
            kind: "p",
            html: i18n.使用Chrome浏览器的Testflowy插件可以自动的帮助我们对网站嵌入TestflowySDK,
          },
          {
            kind: "buttonLink",
            html: i18n.点击安装Tampermonkey插件,
            src: "https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=zh-CN",
          },
          {
            kind: "p",
            html: i18n.在Tampermonkey插件中添加以下代码,
          },
          {
            kind: "code",
            language: "javascript",
            html: `
// ==UserScript==
// @name         Testflowy.com
// @namespace    https://testflowy.com/
// @version      1.0
// @description  try to take over the world!
// @author       Testflowy
// @match        *://*/*
// @icon         https://testflowy.com/logo.svg
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    (function (d) {
        var s = d.createElement("script");
        s.src = "https://testflowy.com/sdk.js?t=" + Date.now();
        s.async = true;
        (d.head || d.body).appendChild(s);
    })(document);
})();         
`,
          },
          {
            kind: "p",
            html: i18n.具体安装步骤可以查看以下视频,
          },
          {
            kind: "video",
            src: "/doc-imgs/plugin-install.mp4",
          },
          {
            kind: "h2",
            html: i18n.启用TestflowySDK,
          },
          {
            kind: "p",
            html: i18n.确保已在测试网站中嵌入了TestflowySDK我们在测试网页中按,
          },
          {
            kind: "img",
            src: "/doc-imgs/testflowy-logo.png",
          },
          {
            kind: "p",
            html: i18n.点击Testflowy按钮可以看到TestflowySDK登录界面,
          },
          {
            kind: "img",
            src: "/doc-imgs/testflowy-logo2.png",
          },
          {
            kind: "p",
            html: i18n.输入您之前注册的账号或者团队成员的账号即可开始测试,
          },
          {
            kind: "img",
            src: "/doc-imgs/testflowy-logo3.png",
          },
          {
            kind: "p",
            html: i18n.如果需要隐藏TestflowySDK我们在网页中再次按,
          },
        ],
      },
    ],
  },
  {
    Icon: TbTestPipe,
    title: i18n.自动化测试,
    items: [
      {
        label: i18n.录制执行,
        content: [
          {
            kind: "h2",
            html: i18n.录制,
          },
          { kind: "p", html: i18n.在TestflowySDK登录后可以看到一个空列表点击右上角的号可以创建一条测试任务 },
          {
            kind: "img",
            height: "600px",
            src: "/doc-imgs/record1.png",
          },
          {
            kind: "p",
            html: i18n.我们可以点击某一条测试任务右侧的播放按钮如下图红色标记,
          },
          {
            kind: "img",
            height: "600px",
            src: "/doc-imgs/record2.png",
          },
          {
            kind: "p",
            html: i18n.此时页面会焦距这条测试任务我们可以看到此条测试任务的Steps为因为新建的测试任务内容是空的,
          },
          {
            kind: "img",
            height: "120px",
            src: "/doc-imgs/record3.png",
          },
          {
            kind: "p",
            html: i18n.点击绿色圆形的录制按钮我们开始录制具体的测试步骤,
          },
          {
            kind: "img",
            height: "120px",
            src: "/doc-imgs/record4.png",
          },
          {
            kind: "p",
            html: i18n.接下来我们只需要正常的交互页面TestflowySDK就可以帮我们录制行为录制后点击保存录制的内容即可保存在个人的测试列表中如下面视频,
          },
          {
            kind: "video",
            height: "600px",
            src: "/doc-imgs/record5.mp4",
          },
          {
            kind: "h2",
            html: i18n.执行,
          },
          {
            kind: "p",
            html: i18n.点击红色方块进行停止录制然后点击蓝色的播放按钮即可执行当前测试如下面视频,
          },
          {
            kind: "video",
            height: "600px",
            src: "/doc-imgs/record6.mp4",
          },
        ],
      },
      {
        label: i18n.测试等待,
        content: [
          { kind: "h2", html: i18n.编辑测试文件 },
          { kind: "p", html: i18n.点击任何一个用例的编辑按钮都即可编辑测试文件 },
          {
            kind: "img",
            height: "600px",
            src: "/doc-imgs/wait1.jpeg",
          },
          { kind: "h2", html: i18n.添加等待时间 },

          {
            kind: "p",
            html: i18n.如下图添加可以添加等待时间,
          },
          {
            kind: "img",
            height: "600px",
            src: "/doc-imgs/wait2.png",
          },
        ],
      },
      {
        label: i18n.聚合测试,
        content: [
          { kind: "h2", html: i18n.创建聚合测试 },
          { kind: "p", html: i18n.接下来我们尝试复制一个测试分支调整测试内容然后聚合执行测试如下面视频 },
          {
            kind: "video",
            height: "600px",
            src: "/doc-imgs/record7.mp4",
          },
          { kind: "h2", html: i18n.视频内容 },
          {
            kind: "p",
            html: i18n.根据视频中的内容我们可以看到,
          },
          {
            kind: "ol",
            htmls: [
              i18n.我们复制了一个测试任务,
              i18n.双击测试名称进行了名称的编辑,
              i18n.重新播放了该测试,
              i18n.当该测试执行成功后我们在该测试的基础上添加了一些额外的内容,
              i18n.我们同时勾选两个测试并且执行测试,
              i18n.当测试执行成功测试列表中的测试任务标记了PASS的标签,
            ],
          },
        ],
      },
      {
        label: i18n.Mock数据,
        content: [
          {
            kind: "p",
            html: i18n.在测试任务中我们常常需要使用随机邮箱随机密码并且在后续的输入行为中重复使用当前的随机文本这对于账号注册表单填写非常有用,
          },
          {
            kind: "h2",
            html: i18n.使用随机邮箱,
          },
          {
            kind: "p",
            html: i18n.当我们在录制测试时并且在文本中输入时Testflowy会自动帮我们生成一个随机邮箱文本,
          },
          {
            kind: "p",
            html: i18n.当我们在录制测试时并且在文本中输入时Testflowy会自动帮我们生成一个随机邮箱文本,
          },
          {
            kind: "video",
            src: "/doc-imgs/record8.mp4",
          },
          {
            kind: "h2",
            html: i18n.所有Mock关键字,
          },
          {
            kind: "ul",
            htmls: [
              i18n.随机邮箱 + ": $email$ / $last-email$",
              i18n.随机手机 + ": $phone$ / $last-phone$",
              i18n.随机密码 + ": $password$ / $last-password$",
              i18n.随机ID + ": $id$ / $last-id$",
              i18n.随机文本长度 + "1: $text1$ / $last-text1$",
              i18n.随机文本长度 + "2: $text2$ / $last-text2$",
              i18n.随机文本长度 + "3: $text3$ / $last-text3$",
              i18n.随机文本长度 + "4: $text4$ / $last-text4$",
              i18n.随机文本长度 + "5: $text5$ / $last-text5$",
              i18n.随机文本长度 + "6: $text6$ / $last-text6$",
              i18n.随机文本长度 + "7: $text7$ / $last-text7$",
              i18n.随机文本长度 + "8: $text8$ / $last-text8$",
              i18n.随机文本长度 + "9: $text9$ / $last-text9$",
              i18n.随机数字小于 + "10: $random10$ / $last-random10$",
              i18n.随机数字小于 + "100: $random100$ / $last-random100$",
              i18n.随机数字小于 + "1000: $random1000$ / $last-random1000$",
              i18n.随机数字小于 + "10000: $random10000$ / $last-random10000$",
              i18n.随机数字小于 + "100000: $random100000$ / $last-random100000$",
              i18n.随机数字小于 + "1000000: $random1000000$ / $last-random1000000$",
              i18n.随机验证码长度 + "1: $code1$ / $last-code1$",
              i18n.随机验证码长度 + "2: $code2$ / $last-code2$",
              i18n.随机验证码长度 + "3: $code3$ / $last-code3$",
              i18n.随机验证码长度 + "4: $code4$ / $last-code4$",
              i18n.随机验证码长度 + "5: $code5$ / $last-code5$",
              i18n.随机验证码长度 + "6: $code6$ / $last-code6$",
              i18n.随机验证码长度 + "7: $code7$ / $last-code7$",
              i18n.随机验证码长度 + "8: $code8$ / $last-code8$",
              i18n.随机验证码长度 + "9: $code9$ / $last-code9$",
            ],
          },
        ],
      },

      {
        label: i18n.调整TestflowySDK的样式,
        content: [
          {
            kind: "h2",
            html: i18n.调整改变Testflowy的默认位置,
          },
          {
            kind: "p",
            html: i18n.Testflowy致敬iPhone的灵动岛所以默认的位置在顶部正中央但我们可以在面板缩小后进行拖动调节到其他指定位置如下视频,
          },
          {
            kind: "video",
            src: "/doc-imgs/record12.mp4",
          },
          {
            kind: "h2",
            html: i18n.调整Testflowy的主题,
          },
          {
            kind: "p",
            html: i18n.Testflowy有暗色和亮色两个主题也是因为致敬灵动岛默认主题是暗色的您可以在设置中切换,
          },
          {
            kind: "img",
            height: "600px",
            src: "/doc-imgs/record13.png",
          },
        ],
      },
      {
        label: i18n.提高测试的健壮性,
        content: [
          {
            kind: "empty",
            html: "h-6",
          },
          {
            kind: "h2",
            html: i18n.自动计算元素定位,
          },
          {
            kind: "p",
            html: i18n.Testflowy录制时会根据元素在页面中的层级和属性进行定位元素在后续的测试回归中如果页面产生变动那么测试会失败因为找不到原有的元素了,
          },
          {
            kind: "p",
            html: i18n.这种失败是正确的因为页面的确已经改变了并且在大部分测试工具中都是保持这种逻辑但是在实际工作中我们会经常因为页面的微小改动导致关键测试步骤的失败这种情况会导致我们需要反复录制新的测试降低了每次测试录制的收益,
          },
          {
            kind: "p",
            html: i18n.Testflowy默认的元素定位逻辑是取决于元素层级和元素属性元素类型和元素的文本内容样式无关所以如果仅仅是调整文案CSS样式并不会打破原有的测试,
          },
          {
            kind: "h2",
            html: i18n.使用ID提高健壮性,
          },
          {
            kind: "p",
            html: i18n.最好的解决方案是开发人员在编写页面的时候给必要录制动作的元素添加id或的标签属性这样Testflowy会优先使用这两个确定的属性进行元素定位后续即便页面的层级做了一些调整只要业务逻辑不变也能最大化的保障测试的健壮性,
          },
          {
            kind: "p",
            html: i18n.当我们录制时如果操作的元素有id或datatestid录制面板右侧会有一个绿色的安全图标,
          },
          {
            kind: "img",
            height: "150px",
            src: "/doc-imgs/safe-1.png",
          },
          {
            kind: "p",
            html: i18n.当我们录制时如果操作的元素没有相关id录制面板的安全图标呈现灰色这表示这个录制行为后期因为布局改动导致测试失败的概率较高,
          },
          {
            kind: "img",
            height: "150px",
            src: "/doc-imgs/safe-2.png",
          },
        ],
      },
      {
        label: i18n.本地加密,
        content: [
          {
            kind: "empty",
            html: "h-6",
          },
          {
            kind: "h2",
            html: i18n.本地加密原理,
          },
          {
            kind: "p",
            html: i18n.Testflowy承诺不会浏览任何用户的测试数据于此同时我们也不鼓励用户在正式环境使用Testflowy,
          },
          {
            kind: "p",
            html: i18n.大部分情况下您的测试数据应该无关机密但是若您希望把安全措施再提高一个级别我们建议您可以使用本地加密,
          },
          {
            kind: "p",
            html: i18n.经过加密的数据即便是团队成员使用也需要获得您的本地密钥建议您通过安全的途径将密钥分发给您的团队成员,
          },
          {
            kind: "p",
            html: i18n.已加密的测试和未加密测试可以混合使用只有当您设定了本地密钥并保存时该用例才会被加密存储不影响其他未加密测试,
          },
          {
            kind: "h2",
            html: i18n.设置本地密钥,
          },
          {
            kind: "p",
            html: i18n.我们在TestflowySDK中点击设置面板输入您的本地密钥,
          },
          {
            kind: "img",
            src: "/doc-imgs/record14.png",
          },
          {
            kind: "p",
            html: i18n.设置了本地密钥之后我们再次保存一个测试能看到该测试有一个加密的图标,
          },
          {
            kind: "img",
            src: "/doc-imgs/record15.png",
          },
        ],
      },
    ],
  },
  {
    Icon: RiUserTeamLine,
    title: i18n.团队协作,
    items: [
      {
        label: i18n.邀请成员,
        content: [
          {
            kind: "p",
            html: i18n.我们已经共享了测试但是团队中还未有其他成员现在我们邀请其他工程师加入团队,
          },
          {
            kind: "h3",
            html: i18n.在控制台输入邀请成员的邮箱,
          },
          {
            kind: "img",
            src: "/doc-imgs/team1.png",
          },
          {
            kind: "h3",
            html: i18n.该成员在邮件中点开邀请链接,
          },
          {
            kind: "p",
            html: i18n.下图是您可能收到的邮件例子,
          },
          {
            kind: "img",
            src: "/doc-imgs/team2.png",
          },
          {
            kind: "h3",
            html: i18n.该成员在链接中填写信息完成注册,
          },
          {
            kind: "img",
            src: "/doc-imgs/team3.png",
          },
          {
            kind: "h3",
            html: i18n.成员完成邮件中的确认后管理员能看到多了一个成员信息,
          },
          {
            kind: "img",
            src: "/doc-imgs/team4.png",
          },
          {
            kind: "h3",
            html: i18n.给新成员授权License,
          },
          {
            kind: "p",
            html: i18n.新成员默认是没有License的您需要授权一个License给他他才能够有权利使用团队协作相关的功能不用担心每个新注册的管理员账号都会赠送License您可以很好的试用后再决定是否长期续费License,
          },
          {
            kind: "img",
            src: "/doc-imgs/team5.png",
          },
          {
            kind: "p",
            html: i18n.如果这个员工离开团队了License可以随时更换给其他成员,
          },
        ],
      },
      {
        label: i18n.管理成员,
        content: [
          {
            kind: "h2",
            html: i18n.成员权限,
          },
          {
            kind: "p",
            html: i18n.成员权限分为两类admin和agent其中admin拥有共享测试的新增浏览删除的权利agent不拥有删除的权利,
          },
          {
            kind: "img",
            src: "/doc-imgs/team6.png",
          },
          {
            kind: "h2",
            html: i18n.移除成员,
          },
          {
            kind: "p",
            html: i18n.点击成员邮件地址左侧的删除按钮在弹框中点击确认即可移除该成员,
          },
          {
            kind: "img",
            src: "/doc-imgs/team7.png",
          },
        ],
      },
      {
        label: i18n.将测试共享到团队,
        content: [
          {
            kind: "p",
            html: i18n.您已经完成了一些测试工作最好的实践就是把您的测试工作共享给团队这样其他团队成员就可以反复使用您的测试用例助力其他成员的开发效率同时您也可以从他人共享的测试复制到个人测试列表中进行调整以完成您的新测试任务,
          },
          {
            kind: "h3",
            html: i18n.共享测试,
          },
          {
            kind: "p",
            html: i18n.点击测试任务中右侧的云朵图标将测试共享到团队,
          },
          {
            kind: "img",
            height: "600px",
            src: "/doc-imgs/record9.png",
          },
          {
            kind: "h3",
            html: i18n.查看共享的测试,
          },
          {
            kind: "p",
            html: i18n.点击顶部的组织菜单其他成员可以看到组织测试列表中有了刚刚共享的测试,
          },
          {
            kind: "img",
            height: "600px",
            src: "/doc-imgs/record10.png",
          },
          {
            kind: "h3",
            html: i18n.直接在控制台执行测试,
          },
          {
            kind: "p",
            html: i18n.在控制台中也可以看到共享的测试我们可以在这里随时执行测试或者统一回归测试,
          },
          {
            kind: "img",
            height: "600px",
            src: "/doc-imgs/record11.png",
          },
        ],
      },
    ],
  },
  {
    Icon: RiSystemShieldKeyholeLine,
    title: i18n.License管理,
    items: [
      {
        label: i18n.延续License,
        content: [
          {
            kind: "p",
            html: i18n.管理员注册账号就会赠送个License每个赠送的License拥有天的试用时长,
          },
          {
            kind: "p",
            html: i18n.如果我们的License过期相关的员工账号就无法使用团队共享功能这时候我们可以续费License时长,
          },
          {
            kind: "h3",
            html: i18n.选择要续费的License,
          },
          {
            kind: "p",
            html: i18n.我们先勾选需要续费的License然后点右上角的续费按钮,
          },
          {
            kind: "img",
            height: "600px",
            src: "/doc-imgs/licene1.png",
          },
          {
            kind: "h3",
            html: i18n.选择支付方式和续费时长,
          },
          {
            kind: "img",
            height: "600px",
            src: "/doc-imgs/licene2.png",
          },
          {
            kind: "p",
            html: i18n.支付成功相应的License即可延续时长,
          },
        ],
      },
      {
        label: i18n.购买License,
        content: [
          {
            kind: "p",
            html: i18n.如果我们团队成员超过当前的License我们可以购买新的License购买新的相同时长的License和续费的价格是一样的,
          },
          {
            kind: "h3",
            html: i18n.开始购买License,
          },
          {
            kind: "p",
            html: i18n.我们点击购买License面板然后点击底部的购买按钮,
          },
          {
            kind: "img",
            height: "600px",
            src: "/doc-imgs/licene3.png",
          },
          {
            kind: "h3",
            html: i18n.填写购买信息,
          },
          {
            kind: "p",
            html: i18n.我们选择支付方式购买时长购买License个数然后点击支付即可,
          },
          {
            kind: "img",
            height: "600px",
            src: "/doc-imgs/licene4.png",
          },
          {
            kind: "p",
            html: i18n.支付成功我们获得新的License,
          },
        ],
      },
      {
        label: i18n.更换成员License,
        content: [
          {
            kind: "h2",
            html: i18n.License调整,
          },
          {
            kind: "p",
            html: i18n.我们会遇到一些团队成员离开的情况这时候可以将License更换给新加入的成员,
          },
          {
            kind: "p",
            html: i18n.团队成员的License可以随时更换同一个License只能给到个团队成员,
          },
          {
            kind: "p",
            html: i18n.如果点击Licensenotset可以移除某个成员的License,
          },
          {
            kind: "img",
            height: "600px",
            src: "/doc-imgs/team5.png",
          },
        ],
      },
    ],
  },
  {
    Icon: BiRegularQuestionMark,
    title: i18n.常见问题,
    items: [
      {
        label: i18n.验证码扫脸支付等场景怎么办,
        content: [
          {
            kind: "p",
            html: i18n.首先我们要明确一点覆盖所有真实场景的测试是很困难的而且是低收益的在涉及第三方的场景下我们建议使用人工测试这类场景人工测试往往比自动化测试的收益更高,
          },
          {
            kind: "p",
            html: i18n.在这类场景中我们建议在测试环境的项目进行规避因为这类场景它非常固定而且每次测试还可能需要支付成本不适合测试这种高频反复执行的场景但是他们又是整个项目流程中的一环很容易阻碍自动化测试的执行,
          },
          {
            kind: "p",
            html: i18n.我们建议这类流程进行人工测试而在自动化测试环境应该想法规避,
          },
          {
            kind: "h3",
            html: i18n.以下为Testflowy的建议仅做参考,
          },
          {
            kind: "ul",
            htmls: [
              i18n.验证码如果是测试环境约定一个固定验证码并且服务端不真正发送发验证码,
              i18n.扫脸如果是测试环境在扫脸的页面增加一个跳过的按钮,
              i18n.支付支付往往是异步的如果是测试环境点击支付后前端直接跳到验证支付成功的页面而服务端直接跳过第三方支付的逻辑,
              i18n.第三方登录在业务逻辑上确保第三方登录和普通账号登是一样的逻辑在自动测试环境仅做普通账号的测试流程,
            ],
          },
          {
            kind: "p",
            html: i18n.测试覆盖就像下围棋把可测部分和外部耦合的部分圈起来分隔好需要人工测试的范围可以自动化测试的范围让自动化测试帮我们降低人工测试的范围即可,
          },
        ],
      },
      // {
      //   label: i18n.Testflowy测试记录中的ID是什么,
      //   content: [
      //     {
      //       kind: "p",
      //       html: i18n.如果我们尝试手动编辑测试内容我们能看到每个测试动作都有一个id属性它其实是Testflowy根据元素的,
      //     },
      //     {
      //       kind: "p",
      //       html: i18n.这有一个小细节如果id中带号表示这个id是使用元素id,
      //     },
      //     {
      //       kind: "p",
      //       html: i18n.与此同时我们强烈建议您只将TestflowySDK嵌入在您的测试环境,
      //     },
      //   ],
      // },
      {
        label: i18n.Testflowy的图片有时候为什么会变成其他图片,
        content: [
          {
            kind: "p",
            html: i18n.Testflowy为了保证测试的效率如果您选择的文件资源过大Testflowy会使用预设文件代替您的测试文件如果要保证文件内容不被变更请使用小尺寸的文件,
          },
        ],
      },
    ],
  },
];

export default function Doc(p: { hiddenBack?: boolean }) {
  return (
    <UxDocument
      Logo={() => (
        <UxSvg
          style={{
            width: "3em",
            height: "3em",
          }}
          src="/logo_custom.svg"
        />
      )}
      title="Testflowy Document"
      languageSelector
      tip="v1.0.0"
      goback={!p.hiddenBack ? routers.goBack : void 0}
      gobackTitle={i18n.返回}
      data={docData}
    />
  );
}
