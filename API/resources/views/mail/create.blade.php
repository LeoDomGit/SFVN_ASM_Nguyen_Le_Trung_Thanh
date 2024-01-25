<!DOCTYPE HTML>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Thông tin tài khoản</title>
</head>

<body
    style="background: #fff !important; margin: 0 auto; margin-top: 30px; width: 90%; font-size: 14px; color: #333333; border: 1px solid #e1e1e1;">
    <div style="margin: 0 auto; width: 90%">
        <div style="margin-bottom: 25px;">
            <h3>{{ $mailData['title'] }}</h3>
            <h4>Thông tin tài khoản của bạn ở web là:</h4>
            <p>Email : <b>{{ $mailData['email'] }}</b></p>
            <p>Mật khẩu : <b>{{ $mailData['password'] }}</b></p>
            <p>Tên : <b>{{ $mailData['name'] }}</b></p>

        </div>
        <p>Thân gửi,</p>
    </div>
    <div style="width: 100%; margin-top: 50px;">
        <img src="https://jobsgo.vn/blog/wp-content/uploads/2023/02/coder-la-gi.jpg" alt="logo" class="img-responsive"
            style="width: 100%">
    </div>
</body>

</html>
