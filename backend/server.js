const express = require('express');
const path = require('path');
const cors = require('cors'); // Import thêm cors
const app = express();
const { rootRouter } = require('./routers');
const { sequelize } = require('./models');

app.use(express.json());

// Cấu hình CORS
app.use(cors());

// Cài đặt tệp tĩnh
const publicPathDirectory = path.join(__dirname, './public');
app.use("/public", express.static(publicPathDirectory));

// Dùng router
app.use('/admin', rootRouter);
app.use('/', rootRouter);
const PORT = 8000;
app.listen(PORT, async () => {
    console.log('Ứng dụng lắng nghe cổng ' + PORT);
    try {
        await sequelize.authenticate();
        console.log('Kết nối thành công đến cơ sở dữ liệu.');
    } catch (error) {
        console.error('Không thể kết nối đến cơ sở dữ liệu:', error);
    }
});
