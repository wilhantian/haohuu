var gulp = require('gulp');
var gulp_ejs = require('gulp-ejs');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

gulp.task('page', function () {
    var tools = [
        {icon:'icon-weixin', color: '#56c13b', name: '微信对话生成器', desc: '微信对话生成器|微信对话生成器在线|微信聊天生成器', link: '/tools/wechat.html'},
        {icon:'icon-shouji', color: '', name: '手机、电话号码查询', desc: '手机、电话号码查询，常用服务电话查询', link: '/tools/phone.html'},
        {icon:'icon-bitmap', color: '#4cb4e7', name: '占位图片', desc: '在线生成占位图片、链接', link: '/tools/imageholder.html'},
        {icon:'icon-dianzi', color: '#434664', name: '5色环电阻阻值计算', desc: '在线5色环电阻阻值计算', link: '/tools/5sehuandianzu.html'},
        {icon:'icon-ershoufang', color: '#e64959', name: '二手房贷计算器', desc: '在线二手房房贷款计算器', link: '/tools/ershoufangdai.html'},
        {icon:'icon-url', color: '#3fcc1c', name: '网址批量打开工具', desc: '在线批量打开多个网站', link: '/tools/oneopen.html'},
        {icon:'icon-rili', color: '#1e92ff', name: '2019放假安排', desc: '在线2019年假期安排表', link: '/tools/fangjiaanpai.html'},
        {icon:'icon-fanyi', color: '#1a6932', name: '在线繁体字转换工具', desc: '在线繁体字转换器', link: '/tools/fantizhuanhuan.html'},
        {icon:'icon-pinpaibiaoshi-mayi', color: '#474747', name: '菊花文生成器和解码器', desc: '在线的菊花文和蚂蚁文的转换工具', link: '/tools/mayiwen.html'},
        {icon:'icon-zhongyingwenqiehuan', color: '#33ffbb', name: '汉字转拼音', desc: '在线汉字转拼音工具', link: '/tools/hanzizhuanpinyin.html'},
        {icon:'icon-yifu', color: 'rgb(202, 88, 255)', name: '标准尺码对照表', desc: '在线尺码表计算器，支持衣服、裤子、内衣、短裤、内裤等服饰尺码查询', link: '/tools/lothing-sizes.html'},
        {icon:'icon-RMB', color: 'rgb(101, 188, 55)', name: '人民币大写转换', desc: '在线将阿拉伯数字转换成人民币大写', link: '/tools/rmb.html'},
        {icon:'icon-jsongeshihua', color: '#56c13b', name: 'JSON校验格式化工具', desc: '在线的JSON格式化校验工具', link: '/tools/json.html'},
        {icon:'icon-shenfenzheng', color: '#ff3e3e', name: '中国家庭称谓计算器', desc: '拜年神器，防止尴尬，教你正确的称呼亲戚', link: '/tools/chenghu.html'},
        {icon:'icon-shijian', color: '#9d9d9d', name: '在线时钟-现在几点了', desc: '不知道现在的时间？就用这款在线时钟工具吧', link: '/tools/clock.html'},
        {icon:'icon-dianliang', color: '#212226', name: '手机电量查询工具', desc: '在线看手机剩余电量、电量剩余使用时间、充电状态查询', link: '/tools/dianliang.html'},
        {icon:'icon-xiangjiao', color: '#e26ca2', name: '在线手机震动工具', desc: '在线的手机震动软件、在线测试震动软件、持续震动', link: '/tools/zhendong.html'},
    ];

    gulp.src(['src/pages/**/*.html'])
        .pipe(gulp_ejs({tools:tools}))
        .pipe(gulp.dest('./build'))
});

gulp.task('assets', function () {
    gulp.src(['src/assets/**'])
        .pipe(gulp.dest('./build/assets'))
        .pipe(connect.reload());
});

gulp.task('sass', function () {
    gulp.src('src/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'))
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        root: 'build',
        livereload: true,
        host: '192.168.1.177',
        port: 8888
    });
});

gulp.task('watch', function () {
    gulp.watch(['./src/**'], ['assets', 'page', 'sass']);
});

gulp.task('serve', ['assets', 'page', 'sass', 'connect', 'watch']);