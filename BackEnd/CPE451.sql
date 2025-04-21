-- Table for user information
CREATE TABLE UserApp (
    user_id INT PRIMARY KEY IDENTITY(1,1),
    user_name NVARCHAR(100) NOT NULL,
    user_email NVARCHAR(100) UNIQUE NOT NULL,
    user_phone NVARCHAR(20) NOT NULL,
    user_password NVARCHAR(255) NOT NULL
);

-- Table for station information
CREATE TABLE Stations (
    station_id NVARCHAR(10) PRIMARY KEY,
    station_name NVARCHAR(100) NOT NULL,
    station_english_name NVARCHAR(100) NOT NULL,
    station_line NVARCHAR(50) NOT NULL,
    station_position INT NOT NULL,
    station_fare DECIMAL(10, 2) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);

-- Table for travel history
CREATE TABLE TravelHistory (
    travel_id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    from_station_id NVARCHAR(10) NOT NULL,
    to_station_id NVARCHAR(10) NOT NULL,
    travel_price DECIMAL(10, 2) NOT NULL,
    traveled_at DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES UserApp(user_id),
    FOREIGN KEY (from_station_id) REFERENCES Stations(station_id),
    FOREIGN KEY (to_station_id) REFERENCES Stations(station_id)
);

-- Table for comments (linked to TravelHistory)
CREATE TABLE Comments (
    comment_id INT PRIMARY KEY IDENTITY(1,1),
    content NVARCHAR(MAX) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT GETDATE(),
    user_id INT NOT NULL,
    travel_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES UserApp(user_id),
    FOREIGN KEY (travel_id) REFERENCES TravelHistory(travel_id)
);

-- Add indexes for performance optimization
CREATE INDEX idx_user_email ON UserApp(user_email);
CREATE INDEX idx_user_id ON TravelHistory(user_id);
CREATE INDEX idx_travel_id ON Comments(travel_id);

-- Insert data from BusStation.js into Stations table with explicit station_id
SET IDENTITY_INSERT Stations ON;

INSERT INTO Stations (station_id, station_name, station_english_name, station_line, station_position, station_fare, latitude, longitude)
VALUES 
('N24', N'คูคต', N'Khu Khot', N'Green Line', 1, 15.00, 13.932372, 100.646541),
('N23', N'แยก คปอ.', N'Yaek Kor Por Aor', N'Green Line', 2, 15.00, 13.92511, 100.62585),
('N22', N'พิพิธภัณฑ์กองทัพอากาศ', N'Royal Thai Air Force Museum', N'Green Line', 3, 15.00, 13.91777, 100.62161),
('N21', N'โรงพยาบาลภูมิพลอดุลยเดช', N'Bhumibol Adulyadej Hospital', N'Green Line', 4, 15.00, 13.91069, 100.61732),
('N20', N'สะพานใหม่', N'Saphan Mai', N'Green Line', 5, 15.00, 13.89647, 100.60904),
('N19', N'สายหยุด', N'Sai Yud', N'Green Line', 6, 15.00, 13.88847, 100.60424),
('N18', N'พหลโยธิน 59', N'Phahon Yothin 59', N'Green Line', 7, 15.00, 13.88256, 100.60078),
('N17', N'วัดพระศรีมหาธาตุ', N'Wat Phra Sri Mahathat', N'Green Line', 8, 15.00, 13.87522, 100.59679),
('N16', N'กรมทหารราบที่ 11', N'11th Infantry Regiment', N'Green Line', 9, 15.00, 13.867645, 100.592076),
('N15', N'บางบัว', N'Bang Bua', N'Green Line', 10, 15.00, 13.856013, 100.585199),
('N14', N'กรมป่าไม้', N'Royal Forest Department', N'Green Line', 11, 15.00, 13.850281, 100.581851),
('N13', N'มหาวิทยาลัยเกษตรศาสตร์', N'Kasetsart University', N'Green Line', 12, 15.00, 13.842296, 100.577141),
('N12', N'เสนานิคม', N'Sena Nikhom', N'Green Line', 13, 15.00, 13.83638, 100.57361),
('N11', N'รัชโยธิน', N'Rachayothin', N'Green Line', 14, 15.00, 13.82975, 100.56971),
('N10', N'พหลโยธิน 24', N'Phahon Yothin 24', N'Green Line', 15, 15.00, 13.82414, 100.56645),
('N9', N'ห้าแยกลาดพร้าว', N'Ha Yaek Lat Phrao', N'Green Line', 16, 15.00, 13.81666, 100.56209),
('N8', N'หมอชิต', N'Mo Chit', N'Green Line', 17, 15.00, 13.80256, 100.55372),
('N7', N'สะพานควาย', N'Saphan Khwai', N'Green Line', 18, 15.00, 13.79385, 100.54973),
('N5', N'อารีย์', N'Ari', N'Green Line', 19, 15.00, 13.77954, 100.54460),
('N4', N'สนามเป้า', N'Sanam Pao', N'Green Line', 20, 15.00, 13.77254, 100.54203),
('N3', N'อนุสาวรีย์ชัยสมรภูมิ', N'Victory Monument', N'Green Line', 21, 15.00, 13.76271, 100.53709),
('N2', N'พญาไท', N'Phaya Thai', N'Green Line', 22, 15.00, 13.75692, 100.53381),
('N1', N'ราชเทวี', N'Ratchathewi', N'Green Line', 23, 15.00, 13.75187, 100.53155),
('CEN', N'สยาม', N'Siam', N'Green Line', 24, 15.00, 13.74561, 100.53419),
('E1', N'ชิดลม', N'Chit Lom', N'Green Line', 25, 15.00, 13.74411, 100.54301),
('E2', N'เพลินจิต', N'Phloen Chit', N'Green Line', 26, 15.00, 13.74307, 100.54917),
('E3', N'นานา', N'Nana', N'Green Line', 27, 15.00, 13.74063, 100.55535),
('E4', N'อโศก', N'Asok', N'Green Line', 28, 15.00, 13.73698, 100.56039),
('E5', N'พร้อมพงษ์', N'Phrom Phong', N'Green Line', 29, 15.00, 13.73049, 100.56958),
('E6', N'ทองหล่อ', N'Thong Lo', N'Green Line', 30, 15.00, 13.72424, 100.57844),
('E7', N'เอกมัย', N'Ekkamai', N'Green Line', 31, 15.00, 13.71952, 100.58511),
('E8', N'พระโขนง', N'Phra Khanong', N'Green Line', 32, 15.00, 13.71520, 100.59116),
('E9', N'อ่อนนุช', N'On Nut', N'Green Line', 33, 15.00, 13.70565, 100.60106),
('E10', N'บางจาก', N'Bang Chak', N'Green Line', 34, 15.00, 13.69666, 100.60530),
('E11', N'ปุณณวิถี', N'Punnawithi', N'Green Line', 35, 15.00, 13.68928, 100.60895),
('E12', N'อุดมสุข', N'Udom Suk', N'Green Line', 36, 15.00, 13.67987, 100.60938),
('E13', N'บางนา', N'Bang Na', N'Green Line', 37, 15.00, 13.66808, 100.60460),
('E14', N'แบริ่ง', N'Bearing', N'Green Line', 38, 15.00, 13.66113, 100.60179),
('E15', N'สำโรง', N'Samrong', N'Green Line', 39, 15.00, 13.64649, 100.59578),
('E16', N'ปู่เจ้า', N'Pu Chao', N'Green Line', 40, 15.00, 13.63737, 100.59200),
('E17', N'ช้างเอราวัณ', N'Chang Erawan', N'Green Line', 41, 15.00, 13.62157, 100.59013),
('E18', N'โรงเรียนนายเรือ', N'Royal Thai Naval Academy', N'Green Line', 42, 15.00, 13.60836, 100.59490),
('E19', N'ปากน้ำ', N'Pak Nam', N'Green Line', 43, 15.00, 13.60210, 100.59707),
('E20', N'ศรีนครินทร์', N'Srinagarindra', N'Green Line', 44, 15.00, 13.59196, 100.60902),
('E21', N'แพรกษา', N'Phraek Sa', N'Green Line', 45, 15.00, 13.58420, 100.60790),
('E22', N'สายลวด', N'Sai Luat', N'Green Line', 46, 15.00, 13.57781, 100.60541),
('E23', N'เคหะฯ', N'Kheha', N'Green Line', 47, 15.00, 13.56767, 100.60769);

SET IDENTITY_INSERT Stations OFF;

-- Sample SELECT statements for testing
SELECT * FROM UserApp;
SELECT * FROM TravelHistory;
SELECT * FROM Stations;
SELECT * FROM Comments;

-- Insert sample data into TravelHistory for testing
INSERT INTO TravelHistory (user_id, from_station_id, to_station_id, travel_price, traveled_at)
VALUES 
(1, 'N24', 'N20', 60.00, GETDATE()), -- User 1 travels from N24 to N20
(1, 'N15', 'N10', 75.00, GETDATE()), -- User 2 travels from N15 to N10
(1, 'E1', 'E5', 60.00, GETDATE());  -- User 3 travels from E1 to E5

-- Insert sample data into Comments for testing
INSERT INTO Comments (content, user_id, travel_id)
VALUES 
(N'การเดินทางสะดวกมาก', 1, 1),
(N'สถานีสะอาดและปลอดภัย', 2, 2),
;

DROP TABLE Comments;
DROP TABLE TravelHistory;
DROP TABLE Stations;
DROP TABLE UserApp;
