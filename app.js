document.write('<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/mdui@0.4.3/dist/css/mdui.min.css">');
document.write('<script src="https://cdn.jsdelivr.net/npm/mdui@1.0.1/dist/js/mdui.min.js"></script>');
document.write('<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css">');
document.write('<link rel="manifest" href="//cdn.jsdelivr.net/gh/RyanL-29/aniopen@1.0.8/manifest.json">');
document.write('<link rel="apple-touch-icon" href="//cdn.jsdelivr.net/gh/RyanL-29/aniopen/pwa_icon/192x192nt.png">');
// markdown支持
document.write('<script src="//cdn.jsdelivr.net/npm/markdown-it@10.0.0/dist/markdown-it.min.js"></script>');
// DPlayer API
document.write('<script src="//cdn.jsdelivr.net/gh/RyanL-29/aniopen@1.0.8/DPlayer.min.js"></script>');
document.write('<style>.mdui-appbar .mdui-toolbar{height:56px;font-size:1pc}.mdui-toolbar>*{padding:0 6px;margin:0 2px}.mdui-toolbar>i{opacity:.5}.mdui-toolbar>.mdui-typo-headline{padding:0 1pc 0 0}.mdui-toolbar>i{padding:0}.mdui-toolbar>a:hover,a.active,a.mdui-typo-headline{opacity:1}.mdui-container{max-width:980px}.mdui-list-item{transition:none}.mdui-list>.th{background-color:initial}.mdui-list-item>a{width:100%;line-height:3pc}.mdui-list-item{margin:2px 0;padding:0}.mdui-toolbar>a:last-child{opacity:1}@media screen and (max-width:980px){.mdui-list-item .mdui-text-right{display:none}.mdui-container{width:100%!important;margin:0}.mdui-toolbar>.mdui-typo-headline,.mdui-toolbar>a:last-child,.mdui-toolbar>i:first-child{display:block}}</style>');

// 初始化页面，并载入必要资源
function init() {
    document.siteName = $('title').html();
    $('body').addClass("mdui-theme-primary-blue-grey mdui-theme-accent-blue mdui-color-grey-800");
    var html = `
<header class="mdui-appbar mdui-color-grey-900 mdui-theme-layout-dark"> 
   <div id="nav" class="mdui-toolbar mdui-container">
   
   </div>
</header>
<div id="content" class="mdui-container"> 
</div>
<div class="mdui-dialog" id="dialog">
    <div class="mdui-dialog-title">New Update Available</div>
    <div class="mdui-dialog-content">Please close and restart the app</div>
    <div class="mdui-dialog-actions">
      <button class="mdui-btn mdui-ripple" mdui-dialog-confirm>OK</button>
    </div>
  </div>`;
    $('body').html(html);
}

function render(path) {
    if (path.indexOf("?") > 0) {
        path = path.substr(0, path.indexOf("?"));
    }
    title(path);
    nav(path);
    if (path.substr(-1) == '/') {
        list(path);
    } else {
        file(path);
    }
}

function globalsearch() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchinput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


// 渲染 title
function title(path) {
    path = decodeURI(path);
    //$('title').html(document.siteName+' - '+path);
}

// 渲染导航栏
function nav(path) {
    var html = "";
    html += `<div style="max-width:150px;"><img class="mdui-typo-headline mdui-img-fluid folder" href="/"  style = "max-width: 100%;height: auto;width: auto;"src="https://cdn.jsdelivr.net/gh/RyanL-29/aniopen/aniopen.png"></div>`;
    var arr = path.trim('/').split('/');
    var p = '/';
    if (arr.length > 0) {
        for (i in arr) {
            var n = arr[i];
            n = decodeURI(n);
            p += n + '/';
            if (n == '') {
                break;
            }
            html += `<style>@media only screen and (max-width: 615px){.pathlist{display:none;}}</style><i class="mdui-icon material-icons mdui-icon-dark folder pathlist" style="margin:0;">chevron_right</i><a class="folder pathlist" href="${p}">${n}</a>`;
        }
        html += `<div class="mdui-toolbar-spacer"></div><div class="mdui-textfield"><i style="top:0.5px;"class="mdui-icon material-icons">search</i><input style="color:white; cursor:text;" id="searchinput" class="mdui-textfield-input" onkeyup="globalsearch()" type="text" placeholder="搜尋"/></div>
    <a href="https://t.me/channel_ani" target="_blank" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-tooltip="{content: 'Telegram'}">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="100%" height="100%" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M9.78 18.65l.28-4.23l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3L3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" fill="white"/></svg>
      </svg>
    </a>`;
    }
    $('#nav').html(html);
}

// 渲染文件列表
function list(path) {
    var content = `
	<div id="head_md" class="mdui-typo" style="display:none;padding: 20px 0;"></div>
	 <div class="mdui-row"> 
	  <ul class="mdui-list"> 
	   <li class="mdui-list-item th"> 
	    <div class="mdui-col-xs-12 mdui-col-sm-7" onclick="sortListDirName()">
	     文件
	<i class="mdui-icon material-icons icon-sort" data-sort="name" data-order="more">expand_more</i>
	    </div> 
	    <div class="mdui-col-sm-3 mdui-text-right" onclick="sortListDirDate()">
	     修改時間
	<i class="mdui-icon material-icons icon-sort" data-sort="date" data-order="downward">expand_more</i>
	    </div> 
	    <div class="mdui-col-sm-2 mdui-text-right" onclick="sortListDirSize()">
	     檔案大小
	<i class="mdui-icon material-icons icon-sort" data-sort="size" data-order="downward">expand_more</i>
	    </div> 
	    </li> 
	  </ul> 
	 </div> 
	 <div class="mdui-row"> 
	  <ul id="list" class="mdui-list"> 
	  </ul> 
	 </div>
	 <div id="readme_md" class="mdui-typo" style="display:none; padding: 20px 0;"></div>
	`;
    $('#content').html(content);

    var password = localStorage.getItem('password' + path);
    $('#list').html(`<div class="mdui-progress"><div class="mdui-progress-indeterminate"></div></div>`);
    $('#readme_md').hide().html('');
    $('#head_md').hide().html('');
    $.post(path, '{"password":"' + password + '"}', function (data, status) {
        var obj = jQuery.parseJSON(data);
        if (typeof obj != 'null' && obj.hasOwnProperty('error') && obj.error.code == '401') {
            var pass = prompt("Require a private token", "");
            localStorage.setItem('password' + path, pass);
            if (pass != null && pass != "") {
                list(path);
            } else {
                history.go(-1);
            }
        } else if (typeof obj != 'null') {
            list_files(path, obj.files);
        }
    });
}

function list_files(path, files) {
    html = "";
    for (i in files) {
        var item = files[i];
        var p = path + item.name + '/';
        if (item['size'] == undefined) {
            item['size'] = "";
        }

        item['modifiedTime'] = utc2HK(item['modifiedTime']);
        item['size'] = formatFileSize(item['size']);
        if (item['mimeType'] == 'application/vnd.google-apps.folder') {
            html += `<li class="mdui-list-item mdui-ripple"><a href="${p}" class="folder">
	            <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate sortname">
	            <i class="mdui-icon material-icons">folder_open</i>
	              ${item.name}
	            </div>
	            <div class="mdui-col-sm-3 mdui-text-right sortdate">${item['modifiedTime']}</div>
	            <div class="mdui-col-sm-2 mdui-text-right sortsize">${item['size']}</div>
	            </a>
	        </li>`;
        } else {
            var p = path + item.name;
            var c = "file";
            if (item.name == "README.md") {
                get_file(p, item, function (data) {
                    markdown("#readme_md", data);
                });
            }
            if (item.name == "HEAD.md") {
                get_file(p, item, function (data) {
                    markdown("#head_md", data);
                });
            }
            var ext = p.split('.').pop();
            if ("|html|php|css|go|java|js|json|txt|sh|md|mp4|webm|avi|bmp|jpg|jpeg|png|gif|m4a|mp3|wav|ogg|mpg|mpeg|mkv|rm|rmvb|mov|wmv|asf|ts|flv|".indexOf(`|${ext.toLowerCase()}|`) >= 0) {
                p += "?a=view";
                c += " view";
            }
            if ("|js|".indexOf(`|${ext.toLowerCase()}|`) >= 0) {

            }
            else {
                html += `<li class="mdui-list-item file mdui-ripple" target="_blank"><a gd-type="${item.mimeType}" href="${p}" class="${c}">
	          <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate sortname">
	          <i class="mdui-icon material-icons">insert_drive_file</i>
	            ${item.name}
	          </div>
	          <div class="mdui-col-sm-3 mdui-text-right sortdate">${item['modifiedTime']}</div>
	          <div class="mdui-col-sm-2 mdui-text-right sortsize">${item['size']}</div>
	          </a>
	      </li>`;
            }
        }
    }
    $('#list').html(html);
}


function get_file(path, file, callback) {
    var key = "file_path_" + path + file['modifiedTime'];
    var data = localStorage.getItem(key);
    if (data != undefined) {
        return callback(data);
    } else {
        $.get(path, function (d) {
            localStorage.setItem(key, d);
            callback(d);
        });
    }
}



// 文件展示 ?a=view
function file(path) {
    var name = path.split('/').pop();
    var ext = name.split('.').pop().toLowerCase().replace(`?a=view`, "");
    if ("|html|php|css|go|java|js|json|txt|sh|md|".indexOf(`|${ext}|`) >= 0) {
        return file_code(path);
    }

    if ("|mp4|webm|avi|".indexOf(`|${ext}|`) >= 0) {
        return file_video(path);
    }

    if ("|mpg|mpeg|mkv|rm|rmvb|mov|wmv|asf|ts|flv|".indexOf(`|${ext}|`) >= 0) {
        return file_video(path);
    }

    if ("|mp3|wav|ogg|m4a|".indexOf(`|${ext}|`) >= 0) {
        return file_audio(path);
    }

    if ("|bmp|jpg|jpeg|png|gif|".indexOf(`|${ext}|`) >= 0) {
        return file_image(path);
    }
}

// 文件展示 |html|php|css|go|java|js|json|txt|sh|md|
function file_code(path) {
    var type = {
        "html": "html",
        "php": "php",
        "css": "css",
        "go": "golang",
        "java": "java",
        "js": "javascript",
        "json": "json",
        "txt": "Text",
        "sh": "sh",
        "md": "Markdown",
    };
    var name = path.split('/').pop();
    var ext = name.split('.').pop();
    var href = window.location.origin + path;
    var rawshare = url.split('/');
    var share = "";
    for (i = 1; i < rawshare.length; i++) {
        var pathcomp = encodeURIComponent(rawshare[i]);
        share = share + '/' + pathcomp;
    }
    var share2 = share.replaceAll(/%25/g, "%");
    share2 = 'https:' + share2 + "?a=view";
    var content = `
<div class="mdui-container">
<pre id="editor" ></pre>
</div>
<div class="mdui-textfield">
	<label class="mdui-textfield-label">下載地址</label>
	<input class="mdui-textfield-input" type="text" value="${href}"/>
</div>
    <button href="${share2}" id="copybt" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-color-theme-accent mdui-ripple" onClick="copyURI(event)"><i class="mdui-icon material-icons">share</i> Share</button>
    <button onclick="javascript:location.href='${href}'" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-ripple mdui-color-theme-accent"><i class="mdui-icon material-icons">cloud_download</i> Download</button>
<script src="https://cdn.staticfile.org/ace/1.4.7/ace.js"></script>
<script src="https://cdn.staticfile.org/ace/1.4.7/ext-language_tools.js"></script>
	`;
    $('#content').html(content);

    $.get(path, function (data) {
        $('#editor').html($('<div/>').text(data).html());
        var code_type = "Text";
        if (type[ext] != undefined) {
            code_type = type[ext];
        }
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/ambiance");
        editor.setFontSize(18);
        editor.session.setMode("ace/mode/" + code_type);

        //Autocompletion
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
            maxLines: Infinity
        });
    });
}

// 文件展示 视频 |mp4|webm|avi|
function file_video(path) {
    var url = window.location.origin + path;
    var rawshare = url.split('/');
    var share = "";
    for (i = 1; i < rawshare.length; i++) {
        var pathcomp = encodeURIComponent(rawshare[i]);
        share = share + '/' + pathcomp;
    }
    var share2 = share.replaceAll(/%25/g, "%");
    var vlc = share2;
    share2 = 'https:' + share2 + "?a=view";
    var playBtn = `<a class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-deep-purple-900" href="vlc://${share2}" target="_blank"><i class="mdui-icon material-icons">&#xe038;</i> 在 VLC media player 中播放</a>`;
    if (/(Android)/i.test(navigator.userAgent)) { //Android
        var playBtn = `<a class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-deep-purple-900 onclick="javascript:location.href='vlc:${vlc}'"><i class="mdui-icon material-icons">&#xe039;</i> 在 VLC media player 中播放</a>`;
    }
    else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //Apple
        var playBtn = `<a class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-deep-purple-900 onclick="javascript:location.href='vlc:${vlc}'");><i class="mdui-icon material-icons">&#xe039;</i> 在 VLC media player 中播放</a>`;
    }
    var content = `
<div class="mdui-container-fluid">
	<br>
    <div class="mdui-video-fluid mdui-center" id="dplayer"></div>
    <br> 如果以上片段無法播放，可使用以下 VLC 播放連結 (請使用 Google Chrome)
	<br>
	<br>${playBtn}
	<!-- 固定标签 -->
	<div class="mdui-textfield">
	  <label style="color:white;" class="mdui-textfield-label">下載地址</label>
	  <input style="color:white;" class="mdui-textfield-input" type="text" value="${url}"/>
	</div>
    <button href="${share2}" id="copybt" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-color-theme-accent mdui-ripple" onClick="copyURI(event)"><i class="mdui-icon material-icons">share</i> Share</button>
    <button onclick="javascript:location.href='${url}'" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-ripple mdui-color-theme-accent"><i class="mdui-icon material-icons">cloud_download</i> Download</button>
    <br>
</div>
	`;
    $('#content').html(content);
    //DP Player implement
    const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        autoplay: false,
        screenshot: false,
        airplay: true,
        theme: '#FF7DCC',
        preload: 'auto',
        autoplay: false,
        hotkey: true,
        video: {
            url: url,
            pic: 'https://raw.githubusercontent.com/RyanL-29/aniopen/master/background.png',
            type: 'auto',
        },
    });


}

// 文件展示 音频 |mp3|m4a|wav|ogg|
function file_audio(path) {
    var url = window.location.origin + path;
    var rawshare = url.split('/');
    var share = "";
    for (i = 1; i < rawshare.length; i++) {
        var pathcomp = encodeURIComponent(rawshare[i]);
        share = share + '/' + pathcomp;
    }
    var share2 = share.replaceAll(/%25/g, "%");
    share2 = 'https:' + share2 + "?a=view";
    var content = `
<div class="mdui-container-fluid">
	<br>
	<audio class="mdui-center" preload controls>
	  <source src="${url}"">
	</audio>
	<br>
	<!-- 固定标签 -->
	<div class="mdui-textfield">
	  <label style="color:white;" class="mdui-textfield-label">下載地址</label>
	  <input style="color:white;" class="mdui-textfield-input" type="text" value="${url}"/>
	</div>
    <button href="${share2}" id="copybt" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-color-theme-accent mdui-ripple" onClick="copyURI(event)"><i class="mdui-icon material-icons">share</i> Share</button>
    <button onclick="javascript:location.href='${url}'" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-ripple mdui-color-theme-accent"><i class="mdui-icon material-icons">cloud_download</i> Download</button>
    <br>
</div>
	`;
    $('#content').html(content);
}


// 图片展示
function file_image(path) {
    var url = window.location.origin + path;
    var rawshare = url.split('/');
    var share = "";
    for (i = 1; i < rawshare.length; i++) {
        var pathcomp = encodeURIComponent(rawshare[i]);
        share = share + '/' + pathcomp;
    }
    var share2 = share.replaceAll(/%25/g, "%");
    share2 = 'https:' + share2 + "?a=view";
    var content = `
<div class="mdui-container-fluid">
	<br>
	<img class="mdui-img-fluid" src="${url}"/>
	<br>
	<div class="mdui-textfield">
	  <label class="mdui-textfield-label">下載地址</label>
	  <input class="mdui-textfield-input" type="text" value="${url}"/>
	</div>
    <button href="${share2}" id="copybt" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-color-theme-accent mdui-ripple" onClick="copyURI(event)"><i class="mdui-icon material-icons">share</i> Share</button>
    <button onclick="javascript:location.href='${url}'" class="mdui-btn mdui-btn-raised mdui-btn-dense mdui-ripple mdui-color-theme-accent"><i class="mdui-icon material-icons">cloud_download</i> Download</button>
    <br>
</div>
	`;
    $('#content').html(content);
}


//时间转换
function utc2HK(utc_datetime) {
    // 转为正常的时间格式 年-月-日 时:分:秒
    var T_pos = utc_datetime.indexOf('T');
    var Z_pos = utc_datetime.indexOf('Z');
    var year_month_day = utc_datetime.substr(0, T_pos);
    var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
    var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06

    // 处理成为时间戳
    timestamp = new Date(Date.parse(new_datetime));
    timestamp = timestamp.getTime();
    timestamp = timestamp / 1000;

    // 增加8个小时，北京时间比utc时间多八个时区
    var unixtimestamp = timestamp + 8 * 60 * 60;

    // 时间戳转为时间
    var unixtimestamp = new Date(unixtimestamp * 1000);
    var year = 1900 + unixtimestamp.getYear();
    var month = "0" + (unixtimestamp.getMonth() + 1);
    var date = "0" + unixtimestamp.getDate();
    var hour = "0" + unixtimestamp.getHours();
    var minute = "0" + unixtimestamp.getMinutes();
    var second = "0" + unixtimestamp.getSeconds();
    return year + "-" + month.substring(month.length - 2, month.length) + "-" + date.substring(date.length - 2, date.length)
        + " " + hour.substring(hour.length - 2, hour.length) + ":"
        + minute.substring(minute.length - 2, minute.length) + ":"
        + second.substring(second.length - 2, second.length);
}

// bytes自适应转换到KB,MB,GB
function formatFileSize(bytes) {
    if (bytes >= 1000000000) { bytes = (bytes / 1000000000).toFixed(2) + ' GB'; }
    else if (bytes >= 1000000) { bytes = (bytes / 1000000).toFixed(2) + ' MB'; }
    else if (bytes >= 1000) { bytes = (bytes / 1000).toFixed(2) + ' KB'; }
    else if (bytes > 1) { bytes = bytes + ' bytes'; }
    else if (bytes == 1) { bytes = bytes + ' byte'; }
    else { bytes = ''; }
    return bytes;
}

String.prototype.trim = function (char) {
    if (char) {
        return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
    }
    return this.replace(/^\s+|\s+$/g, '');
};


// README.md HEAD.md 支持
function markdown(el, data) {
    if (window.md == undefined) {
        //$.getScript('https://cdn.jsdelivr.net/npm/markdown-it@10.0.0/dist/markdown-it.min.js',function(){
        window.md = window.markdownit();
        markdown(el, data);
        //});
    } else {
        var html = md.render(data);
        $(el).show().html(html);
    }
}

// 监听回退事件
window.onpopstate = function () {
    var path = window.location.pathname;
    render(path);
}


//Sorting for list date
function sortListDirDate() {
    var list, i, switching, b, shouldSwitch, dir, switchcount = 0, c, d;
    list = document.getElementById("list");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    // Make a loop that will continue until no switching has been done:
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        b = list.getElementsByTagName("LI");
        c = document.getElementsByClassName("sortdate");
        //console.log(c[0].innerHTML);
        //console.log(c[1].innerHTML);
        // Loop through all list-items:
        for (i = 0; i < (c.length - 1); i++) {
            d = 0;
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Check if the next item should switch place with the current item,
            based on the sorting direction (asc or desc): */
            if (dir == "asc") {
                d = i + 1;
                if (c[i].innerHTML > c[d].innerHTML) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                d = i + 1;
                if (c[i].innerHTML < c[d].innerHTML) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
            // Each time a switch is done, increase switchcount by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

//Sorting for list size
function sortListDirSize() {
    var list, i, switching, b, shouldSwitch, dir, switchcount = 0, c, d;
    list = document.getElementById("list");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    // Make a loop that will continue until no switching has been done:
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        b = list.getElementsByTagName("LI");
        c = document.getElementsByClassName("sortsize");
        //console.log(c[0].innerHTML);
        //console.log(c[1].innerHTML);
        // Loop through all list-items:
        for (i = 0; i < (c.length - 1); i++) {
            d = 0;
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Check if the next item should switch place with the current item,
            based on the sorting direction (asc or desc): */
            if (dir == "asc") {
                d = i + 1;
                if (c[i].innerHTML > c[d].innerHTML) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                d = i + 1;
                if (c[i].innerHTML < c[d].innerHTML) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
            // Each time a switch is done, increase switchcount by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

//Sorting for list size
function sortListDirName() {
    var list, i, switching, b, shouldSwitch, dir, switchcount = 0, c, d;
    list = document.getElementById("list");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    // Make a loop that will continue until no switching has been done:
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        b = list.getElementsByTagName("LI");
        c = document.getElementsByClassName("sortname");
        //console.log(c[0].innerHTML);
        //console.log(c[1].innerHTML);
        // Loop through all list-items:
        for (i = 0; i < (c.length - 1); i++) {
            d = 0;
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Check if the next item should switch place with the current item,
            based on the sorting direction (asc or desc): */
            if (dir == "asc") {
                d = i + 1;
                if (c[i].innerHTML > c[d].innerHTML) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                d = i + 1;
                if (c[i].innerHTML < c[d].innerHTML) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            b[i].parentNode.insertBefore(b[i + 1], b[i]);
            switching = true;
            // Each time a switch is done, increase switchcount by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

/*Easter egg */
function printlogo() {
    var k = "\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMmmmmmmmmmmmmNMMMMMMMMMMMMMMNmmmmmmmmmmmMMMMMMMMMMMMmmmmmmmmmNMMMMMd::::::::::+MMMMM\nMMMMMMMMMMMMMMMMs````````````/MMMMMMMMMMMMMMd```````````+NMMMMMMMMMm`````````yMMMMMy          .MMMMM\nMMMMMMMMMMMMMMMN`             yMMMMMMMMMMMMMh            :mMMMMMMMMm         yMMMMMy          .MMMMM\nMMMMMMMMMMMMMMM/              .NMMMMMMMMMMMMh             .dMMMMMMMm         yMMMMMy          .MMMMM\nMMMMMMMMMMMMMMd                oMMMMMMMMMMMMh              `yMMMMMMm         yMMMMMh----------/MMMMM\nMMMMMMMMMMMMMM-                `dMMMMMMMMMMMh                oNMMMMm         yMMMMMNmmmmmmmmmmmMMMMM\nMMMMMMMMMMMMMs        `         :MMMMMMMMMMMh                 :NMMMm         yMMMMMy          .MMMMM\nMMMMMMMMMMMMm`       +o          yMMMMMMMMMMh                  .dMMm         yMMMMMy          .MMMMM\nMMMMMMMMMMMM/       `NN.         `NMMMMMMMMMh        -.         `yMN         yMMMMMy          .MMMMM\nMMMMMMMMMMMh        oMMs          +MMMMMMMMMh         d`          sM.        yMMMMMy          .MMMMM\nMMMMMMMMMMM.       .NMMM.          dMMMMMMMMh         dm.          o/        yMMMMMy          .MMMMM\nMMMMMMMMMMo        yMMMMh          -MMMMMMMMh         dMm-          .        yMMMMMy          .MMMMM\nMMMMMMMMMm`        ::::::           sMMMMMMMh         dMMN/                  yMMMMMy          .MMMMM\nMMMMMMMMM:                          `mMMMMMMh         dMMMMo                 yMMMMMy          .MMMMM\nMMMMMMMMh                            /MMMMMMh         dMMMMMy`               yMMMMMy          .MMMMM\nMMMMMMMN.                             hMMMMMh         dMMMMMMd.              yMMMMMy          .MMMMM\nMMMMMMMo        `++++++++++.          .NMMMMh         dMMMMMMMm:             yMMMMMy          .MMMMM\nMMMMMMm`        yMMMMMMMMMMh           oMMMMh         dMMMMMMMMN+            yMMMMMy          .MMMMM\nMMMMMM:        :MMMMMMMMMMMM:          `dMMMh         dMMMMMMMMMMs`          yMMMMMy          .MMMMM\nMMMMMy         dMMMMMMMMMMMMm           :MMMh         dMMMMMMMMMMMh`         yMMMMMy          .MMMMM\nMMMMMdyyyyyyyyhMMMMMMMMMMMMMMhyyyyyyyyyyyNMMNyyyyyyyyyNMMMMMMMMMMMMmyyyyyyyyymMMMMMmyyyyyyyyyyhMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM                            MMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM      PowerBy: GoIndex      MMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM      Theme Design: ANi     MMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM                            MMMMMMM\nMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM"
    console.log(k);
}



$(function () {
    init();
    printlogo();
    var path = window.location.pathname;
    $("body").on("click", '.folder', function () {
        var url = $(this).attr('href');
        history.pushState(null, null, url);
        render(url);
        return false;
    });

    $("body").on("click", '.view', function () {
        var url = $(this).attr('href');
        history.pushState(null, null, url);
        render(url);
        return false;
    });

    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'https://cdn.jsdelivr.net/gh/RyanL-29/aniopen/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);

    render(path);
});