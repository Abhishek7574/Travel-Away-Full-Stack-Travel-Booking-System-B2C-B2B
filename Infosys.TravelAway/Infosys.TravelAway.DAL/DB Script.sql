--Drop database TravelAwayDB
--create database TravelAwayDB
--USE TravelAwayDB

---------------Table Creation and Dummy Data Insertion---------------


---------------Users Roles---------------

IF(EXISTS (SELECT name from master.dbo.sysdatabases where ('[' + name + ']' = N'TravelAwayDB' OR name = N'TravelAwayDB')))


IF OBJECT_ID('BookPackage')  IS NOT NULL
DROP TABLE BookPackage
GO

IF OBJECT_ID('Customer') IS NOT NULL
DROP TABLE Customer
GO

IF OBJECT_ID('Package') IS NOT NULL
DROP TABLE Package
GO


IF OBJECT_ID('PackageCategory') IS NOT NULL
DROP TABLE PackageCategory
GO

IF OBJECT_ID('PackageDetails') IS NOT NULL
DROP TABLE PackageDetails
GO

IF OBJECT_ID('Payment') IS NOT NULL
DROP TABLE Payment
GO

IF OBJECT_ID('Rating') IS NOT NULL
DROP TABLE Rating
GO

IF OBJECT_ID('Roles') IS NOT NULL
DROP TABLE Roles
GO
IF OBJECT_ID('Employee') IS NOT NULL
DROP TABLE Employee
GO

IF OBJECT_ID('usp_BookPackage') IS NOT NULL
DROP PROC usp_BookPackage
GO

IF OBJECT_ID('usp_EditProfile') IS NOT NULL
DROP PROC usp_EditProfile
GO
IF OBJECT_ID('usp_Login') IS NOT NULL
DROP PROC usp_Login
GO

IF OBJECT_ID('usp_RegisterCustomer') IS NOT NULL
DROP PROC usp_RegisterCustomer
GO
IF OBJECT_ID('usp_ViewBookedPackages') IS NOT NULL
DROP PROC usp_ViewBookedPackages
GO

IF OBJECT_ID('ufn_ViewAllPackages') IS NOT NULL
DROP FUNCTION ufn_ViewAllPackages
GO

IF OBJECT_ID('ufn_ViewPackageCategory')  IS NOT NULL
DROP FUNCTION ufn_ViewPackageCategory
GO


IF OBJECT_ID('ufn_ViewPackageDetail')  IS NOT NULL
DROP FUNCTION ufn_ViewPackageDetail
GO

IF OBJECT_ID('ufn_ViewPackageByCategory')  IS NOT NULL
DROP FUNCTION ufn_ViewPackageByCategory
GO
create table Roles(
[RoleId] TINYINT CONSTRAINT pk_RoleId PRIMARY KEY IDENTITY,
[RoleName] VARCHAR(20) CONSTRAINT uq_RoleName UNIQUE
);

SET IDENTITY_INSERT Roles ON
INSERT INTO Roles(RoleId,RoleName) VALUES (1,'Customer')
INSERT INTO Roles(RoleId,RoleName) VALUES (2,'Employee')
SET IDENTITY_INSERT Roles OFF

---------------Customer---------------

CREATE TABLE Customer(
[EmailId] VARCHAR(50) CONSTRAINT pk_EmailId PRIMARY KEY,
[RoleId] TINYINT CONSTRAINT fk_RoleId REFERENCES Roles(RoleId),
[FirstName] VARCHAR(50) CONSTRAINT chk_FirstName CHECK(NOT [FirstName] LIKE '% %') NOT NULL,
[LastName] VARCHAR(50) CONSTRAINT chk_LastName CHECK(NOT [LastName] LIKE '% %') NOT NULL,
[UserPassword] VARCHAR(15) CONSTRAINT chk_UserPassword CHECK(len([UserPassword])>=8 AND len([UserPassword])<=16) NOT NULL,
[Gender] CHAR CONSTRAINT chk_Gender CHECK(Gender='F' OR Gender='M') NOT NULL,
[ContactNumber] NUMERIC(10) CONSTRAINT chk_ContactNumber check([ContactNumber] NOT LIKE '0%' AND len([ContactNumber])=10) NOT NULL, --SQUARE BRACES
[DateOfBirth] DATE CONSTRAINT chk_DateOfBirth CHECK(DateOfBirth<GETDATE()) NOT NULL,
[Address] VARCHAR(250) NOT NULL
);

INSERT INTO Customer(EmailId,UserPassword,RoleId,Gender,FirstName,LastName,ContactNumber,DateOfBirth,[Address]) VALUES('poorvi@gmail.com','abcd@1234',1,'M','Poorvi','Jain',8465713549,'1998-12-04','Lucknow');
INSERT INTO Customer(EmailId,UserPassword,RoleId,Gender,FirstName,LastName,ContactNumber,DateOfBirth,[Address]) VALUES('Mayank@gmail.com','efgh@1234',1,'M','Mayank','Sharma',2457984315,'1999-05-22','Delhi');
INSERT INTO Customer(EmailId,UserPassword,RoleId,Gender,FirstName,LastName,ContactNumber,DateOfBirth,[Address]) VALUES('Prabhjeet@gmail.com','hijk@1234',1,'F','Prabhjeet','Bhabar',4587921568,'1997-10-26','Mumbai');
INSERT INTO Customer(EmailId,UserPassword,RoleId,Gender,FirstName,LastName,ContactNumber,DateOfBirth,[Address]) VALUES('Sagar@gmail.com','lmno@1234',1,'M','Sagar','Sharma',3654789125,'1998-08-17','Pune');




---------------Packages Category---------------
CREATE TABLE PackageCategory(
[PackageCategoryId] INT CONSTRAINT pk_PackageCategoryId PRIMARY KEY IDENTITY(100,1),
[PackageCategoryName] VARCHAR(20) UNIQUE NOT NULL
);
INSERT INTO PackageCategory(PackageCategoryName)VALUES('Adventure'),('Nature'),('Religious'),('Village'),('Wildlife')

---------------Packages---------------

CREATE TABLE Package(
[PackageId] INT CONSTRAINT pk_PackageId PRIMARY KEY IDENTITY(2000,1),
[PackageName] VARCHAR(30) UNIQUE NOT NULL,
[PackageCategoryId] INT CONSTRAINT fk_PackageCategoryId REFERENCES PackageCategory(PackageCategoryId),
[TypeOfPackage] VARCHAR(15) CONSTRAINT chk_TypeOfPackage CHECK(TypeOfPackage IN ('International','Domestic'))
);

SET IDENTITY_INSERT Package OFF
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('North India',100,'Domestic')
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('Malibu Islands',101,'International')
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('America',102,'International')
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('Australia',103,'International')
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('Maldives',104,'International')
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('Kasol-Manali',100,'Domestic')
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('Beauty of South',101,'Domestic')
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('Himachal',102,'Domestic')
INSERT INTO Package(PackageName,PackageCategoryId,TypeOfPackage) VALUES('Heart of India',100,'Domestic')

---------------Package Details---------------

CREATE TABLE PackageDetails(
[PackageDetailsId] INT CONSTRAINT pk_PaclageDetailsId PRIMARY KEY IDENTITY(900,1),
[PackageId] INT CONSTRAINT fk_PackageId REFERENCES Package(PackageId),
[PlacesToVisit] VARCHAR(500) NOT NULL,
[Description] VARCHAR(500) NOT NULL,
[NoOfDays] INT NOT NULL,
[NoOfNights] INT NOT NULL,
[Accomodation] VARCHAR(10) CONSTRAINT chk_Accomodation CHECK(Accomodation IN ('Available','Unavailable')),
[PricePerAdult] DECIMAL
);
INSERT INTO PackageDetails(PackageId,PlacesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2000,'Ooty','Great Place!',2,2,'Available',1000)
INSERT INTO PackageDetails(PackageId,PlacesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2001,'Jaipur','Great Place!',3,2,'Available',1200)
INSERT INTO PackageDetails(PackageId,PlacesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2002,'America','America never sleeps',5,4,'Available',9500)
INSERT INTO PackageDetails(PackageId,PlacesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2003,'Australia','Explore the beauty',4,4,'Available',8500)
INSERT INTO PackageDetails(PackageId,PlacesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2004,'Maldives','Love beaches? Check this out!!',4,3,'Available',9000)
INSERT INTO PackageDetails(PackageId,PlacesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2005,'Kullu-Manali','Best for trips with friends!',4,3,'Available',900)
INSERT INTO PackageDetails(PackageId,PlacesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2006,'Kanyakumari-Kerela','Heritage of India',4,4,'Available',1500)
INSERT INTO PackageDetails(PackageId,PlacesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2007,'Dehradun-Rishikesh','Religious-Family Place!',3,2,'Available',800)
INSERT INTO PackageDetails(PackageId,PlacesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2008,'Delhi','Great Place!',2,2,'Available',2000)
INSERT INTO PackageDetails(PackageId,PlacesToVisit,Description,NoOfDays,NoOfNights,Accomodation,PricePerAdult) VALUES(2000,'Chandigarh','Clean City!',2,2,'Available',1000)




---------------Package Bookings---------------

CREATE TABLE BookPackage(
[EmailId] VARCHAR(50) CONSTRAINT fk_EmailId REFERENCES Customer(EmailId),
[BookingId] INT CONSTRAINT pk_BookingId PRIMARY KEY IDENTITY(4000,1),
[ContactNumber] NUMERIC(10) NOT NULL,
[Address] VARCHAR(100) NOT NULL,
[DateOfTravel] DATE NOT NULL CONSTRAINT chk_DateOfTravel CHECK(DateOfTravel>=GETDATE()),
[NumberOfAdults] INT NOT NULL,
[NumberOfChildren] INT,
[Status] VARCHAR(10) NOT NULL CONSTRAINT chk_Status CHECK([Status] IN ('Booked','Confirmed')),
[PackageId] INT CONSTRAINT fk_packId REFERENCES PackageDetails(PackageDetailsId)
);
-----Added PackageId to BookPackage-----
INSERT INTO BookPackage(EmailId,ContactNumber,[Address],DateOfTravel,NumberOfAdults,NumberOfChildren,[Status],PackageId) VALUES('Mayank@gmail.com',2457984315,'310-Lucknow','2026-12-20',2,0,'Booked',900)
INSERT INTO BookPackage(EmailId,ContactNumber,[Address],DateOfTravel,NumberOfAdults,NumberOfChildren,[Status],PackageId) VALUES('poorvi@gmail.com',8465713549,'253-Delhi','2026-04-12',3,0,'Booked',909)
INSERT INTO BookPackage(EmailId,ContactNumber,[Address],DateOfTravel,NumberOfAdults,NumberOfChildren,[Status],PackageId) VALUES('Prabhjeet@gmail.com',4587921568,'310-Agra','2026-05-09',2,1,'Booked',901)

INSERT INTO BookPackage(EmailId,ContactNumber,[Address],DateOfTravel,NumberOfAdults,NumberOfChildren,[Status],PackageId) VALUES('Sagar@gmail.com',3654789125,'310-pune','2026-09-07',2,0,'Booked',902)










---------------Ratings---------------

CREATE TABLE Rating(
[RatingId] INT CONSTRAINT pk_RatingId PRIMARY KEY IDENTITY(1,1),
[Comments] VARCHAR(200),
[Rating] INT CONSTRAINT chk_Rating CHECK(Rating>0 AND Rating<=5),
[BookingId] INT CONSTRAINT fk_BookId REFERENCES BookPackage(BookingId)
);





CREATE TABLE Employee(
[EmpId] INT CONSTRAINT pk_EMPID PRIMARY KEY IDENTITY,
[FirstName] VARCHAR(50) CONSTRAINT chk_FName CHECK(NOT[FirstName] LIKE '% %') NOT NULL,
[LastName] VARCHAR(50) CONSTRAINT chk_LName CHECK(NOT[LastName] LIKE '% %') NOT NULL,
[Password] VARCHAR(15) CONSTRAINT chk_Password CHECK(len([Password])>=8 AND LEN ([Password])<=16) NOT NULL,
[RoleId] TINYINT CONSTRAINT fk_RId REFERENCES Roles(RoleId),
[EmailId] VARCHAR(50)
)
INSERT INTO Employee(FirstName,LastName,[Password],RoleId,EmailId) VALUES('Steve','Rogers','qwertyuiop',2,'steve@gmail.com')
INSERT INTO Employee(FirstName,LastName,[Password],RoleId,EmailId) VALUES('Peter','Parker','asdfghjkl',2,'peter@gmail.com')

--CREATE TABLE CustomerCare(
--[QueryId] INT CONSTRAINT pk_QueryId PRIMARY KEY IDENTITY,
--[BookingId] INT CONSTRAINT fk_BId REFERENCES BookPackage(BookingId),
--[Query] VARCHAR(100),
--[QueryStatus] VARCHAR(30) CONSTRAINT chk_QueryStatus CHECK(QueryStatus='Assigned' OR QueryStatus='In Progress' OR QueryStatus='Closed'),
--[Assignee] INT CONSTRAINT fk_Assignee REFERENCES Employee(EmpId),
--[QueryAnswer] VARCHAR(200)
--)
----INSERT INTO CustomerCare(BookingId,Query,QueryStatus,Assignee,QueryAnswer)



--CREATE TABLE Payment(
--[PaymentId] INT CONSTRAINT pk_PaymentId PRIMARY KEY IDENTITY,
--[BookingId] INT CONSTRAINT fk_PaymentBookId REFERENCES BookPackage(BookingId),
--[TotalAmount] MONEY,
--[PaymentStatus] VARCHAR(20) CONSTRAINT chk_PaymentStatus CHECK (PaymentStatus='Confirmed' OR PaymentStatus='Not Confirmed')
--);
----Delete from Payment;

--INSERT INTO Payment(BookingId,TotalAmount,PaymentStatus) VALUES (4002,2000000,'Confirmed')


---------------STORED PROCEDURES---------------

---------------REGISTER CUSTOMER---------------
go
Create PROCEDURE usp_RegisterCustomer
(
@EmailId VARCHAR(30),
@FirstName VARCHAR(20),
@LastName VARCHAR(20),
@Password VARCHAR(16),
@Gender CHAR,
@Contact NUMERIC(10),
@DOB DATE,
@Address VARCHAR(50)
)
AS BEGIN
	DECLARE @RoleId CHAR(2),
		@retval INT
	BEGIN TRY
		IF(LEN(@EmailId)<4 OR LEN(@EmailId) IS NULL)
		SET @retval=-1
		ELSE IF(LEN(@Password)<8 OR LEN(@Password)>16 OR (@Password IS NULL))
		SET @retval=-2
		ELSE IF(@DOB>=CAST(GETDATE() AS DATE) OR (@DOB IS NULL))
		SET @retval=-3
		ELSE IF (DATEDIFF(day,@DOB,GETDATE())<6570)
		SET @retval=-4
		ELSE IF(@FirstName LIKE('%[^a-zA-Z]%') OR LEN(@FirstName)=0)
		SET @retval=-5
		ELSE IF(@LastName LIKE ('%[^a-zA-Z]%') OR LEN(@LastName)=0)
		SET @retval=-5
		ELSE
			BEGIN
				SELECT @RoleId=RoleId FROM dbo.Roles WHERE RoleName='Customer'
				INSERT INTO Customer VALUES
				(@EmailId,@RoleId,@FirstName,@LastName,@Password,@Gender,@Contact,@DOB,@Address)
				SET @retval=1
			END
		SELECT @retval
	END TRY
	BEGIN CATCH
		SET @retval=-99
		SELECT @retval, ERROR_LINE(),ERROR_MESSAGE()
	END CATCH
END 
GO
--DECLARE @ReturnResult INT
--EXEC usp_RegisterCustomer 'xyz@gmail.com','Joey','Tribianni','FOOD@1234','M',8976450023,'1998-03-10','234 London'
--SELECT @ReturnResult as ReturnResult
--GO

CREATE PROCEDURE usp_Login
(
@EmailId VARCHAR(30),
@Password VARCHAR(16)
)
AS BEGIN
	BEGIN TRY
		IF NOT EXISTS(select EmailId from Customer where EmailId=@EmailId)
			return -1
		ELSE IF NOT EXISTS(select EmailID from Customer where EmailId=@EmailId and UserPassword=@Password)
			return 0
		ELSE 
			return 1
	END TRY
	BEGIN CATCH
		SELECT ERROR_LINE(),ERROR_MESSAGE()
		return -99
	END CATCH
END
GO

CREATE PROCEDURE usp_LoginEmployee
(
@EmailId VARCHAR(30),
@Password VARCHAR(16)
)
AS BEGIN
	BEGIN TRY
		IF NOT EXISTS(select EmailId from Employee where EmailId=@EmailId)
			return -1
		ELSE IF NOT EXISTS(select EmailID from Employee where EmailId=@EmailId and [Password]=@Password)
			return 0
		ELSE 
			return 1
	END TRY
	BEGIN CATCH
		SELECT ERROR_LINE(),ERROR_MESSAGE()
		return -99
	END CATCH
END
GO
---------------Edit Profile---------------

CREATE PROCEDURE usp_EditProfile
(
@EmailId VARCHAR(50),
@FirstName VARCHAR(30),
@LastName VARCHAR(30),
@Gender CHAR,
@ContactNumber NUMERIC(10),
@DateOfBirth DATE,
@Address VARCHAR(200)
)
AS
	BEGIN
		DECLARE @retval INT
		BEGIN TRY
			IF(@EmailId IS NULL)
				SET @retval=-1
			ELSE IF(@FirstName IS NULL)
				SET @retval=-2
			ELSE IF(@LastName IS NULL)
				SET @retval=-3
			ELSE IF(@Gender IS NULL)
				SET @retval=-4
			ELSE IF(@ContactNumber IS NULL)
				SET @retval=-5
			ELSE IF(@DateOfBirth IS NULL)
				SET @retval=-6
			ELSE IF(@Address IS NULL)
				SET @retval=-7
			ELSE IF NOT EXISTS(SELECT EmailId FROM Customer WHERE EmailId=@EmailId)
				SET @retval=-8
			ELSE IF(LEN(@EmailId)<5 OR LEN(@EmailId)>50)
				SET @retval=-9
			ELSE IF(@Gender<>'F' AND @Gender<>'M')
				SET @retval=-10
			ELSE IF(@DateOfBirth>= CAST(GETDATE() AS DATE))
				SET @retval=-11
			ELSE IF(@FirstName LIKE '%^[a-zA-Z]%')
				SET @retval=-12
			ELSE IF(@LastName LIKE '%^[a-zA-Z]%')
				SET @retval=-13
			ELSE IF(LEN(@ContactNumber)<>10)
				SET @retval=-14
			ELSE IF(@ContactNumber LIKE '%^[0-9]%')
				SET @retval=-15
			ELSE IF(@ContactNumber LIKE '^0%')
				SET @retval=-16
			ELSE
				BEGIN
					UPDATE Customer SET FirstName=@FirstName,Lastname=@LastName,Gender=@Gender, ContactNumber=@ContactNumber,
					DateOfBirth=@DateOfBirth,[Address]=@Address WHERE EmailId=@EmailId
					SET @retval=1
				END
			RETURN @retval
		END TRY
		BEGIN CATCH
			SET @retval=-99
			SELECT ERROR_MESSAGE(), ERROR_LINE()
			RETURN @retval
		END CATCH
	END
GO
---------------View Packages' Category---------------

CREATE FUNCTION ufn_ViewPackageCategory()
RETURNS TABLE
AS 
RETURN
	(SELECT PackageCategoryId,PackageCategoryName FROM PackageCategory);
GO

---------------View All Packages'---------------
CREATE FUNCTION ufn_ViewAllPackages()
RETURNS TABLE
AS
	RETURN ( 
	--SELECT P.PackageId,P.PackageCategoryId,P.PackageName,P.TypeOfPackage,PD.[Description] 
	--FROM Package P INNER JOIN PackageDetails PD on P.PackageId=PD.PackageId
	SELECT * FROM Package
	);
GO

-----------------View Packages by Category---------------
CREATE FUNCTION ufn_ViewPackagesByCategory(@PackageCategoryId INT)
RETURNS TABLE
AS
	RETURN ( 
	--SELECT P.PackageId,P.PackageCategoryId,P.PackageName,P.TypeOfPackage,PD.[Description] 
	--FROM Package P INNER JOIN PackageDetails PD on P.PackageId=PD.PackageId
	--WHERE PackageCategoryId= @PackageCategoryId
	SELECT * FROM Package WHERE PackageCategoryId=@PackageCategoryId
	);
GO
---------------View Packages' Details---------------

CREATE FUNCTION ufn_ViewPackageDetail(@PackageId INT)
RETURNS TABLE
AS 
RETURN(
	SELECT P.PackageName,PD.PlacesToVisit,PD.[Description],PD.NoOfDays,PD.NoOfNights,PD.Accomodation, PD.PricePerAdult 
	FROM Package P INNER JOIN PackageDetails PD ON  P.PackageId=@PackageId
	);
GO

---------------Book Package---------------
CREATE PROCEDURE [usp_BookPackage]
(
@EmailId VARCHAR(50),
@ContactNumber NUMERIC(10),
@Address VARCHAR(100),
@DateOfTravel DATE,
@NumberOfAdults INT ,
@NumberOfChildren INT,
@Status VARCHAR(10),
@PackageId INT,
@BookingId BIGINT OUT
)
AS
BEGIN
	BEGIN TRY
		IF NOT EXISTS (SELECT EmailId FROM Customer WHERE EmailId=@EmailId)
			RETURN -1;
		ELSE IF (@ContactNumber LIKE '%^[0-9]%' OR @ContactNumber IS NULL)
			RETURN -2;
		ELSE IF (@DateOfTravel<= CAST(GETDATE() AS DATE))
			RETURN -3;
		ELSE IF (@NumberOfAdults IS NULL AND @NumberOfChildren IS NULL)
			RETURN -4;
		ELSE IF (@PackageId IS NULL)
			RETURN -5;
		ELSE
		BEGIN
			INSERT INTO BookPackage(EmailId,ContactNumber,Address,DateOfTravel,NumberOfAdults,NumberOfChildren,Status,PackageId)
			VALUES(@EmailId,@ContactNumber,@Address,@DateOfTravel,@NumberOfAdults,@NumberOfChildren,@Status,@PackageId)
			SET @BookingId = IDENT_CURRENT('BookPackage')
			RETURN @BookingId;
		END
	END TRY
	BEGIN CATCH
		RETURN -99
	END CATCH
END
GO

--DECLARE @retval INT, @BookingId BIGINT
--EXEC @retval = usp_BookPackage 'sagar@gmail.com','9844543210','Mumbai ckwbcecbeucbeucbsusavsvsv','2021-08-17',4,2,'Booked',900,@BookingId OUT
--SELECT @retval as RETURNVALUE, @BookingId as BOOKINGID
--GO


---------------View Booked Pakages---------------

--CREATE FUNCTION ufn_ViewBookedPackages(@EmailId VARCHAR(50))
--RETURNS TABLE
--AS
--	RETURN (SELECT
--	BP.BookingId, BP.NumberOfAdults, BP.NumberOfChildren,BP.DateOfTravel,
--	ISNULL(P.TotalAmount,-97) AS TotalAmount,
--	ISNULL(A.HotelName,'N/A') AS HotelName, ISNULL(A.NoOfRooms,-97) AS NoOfRooms,
--	PD.PlacesToVisit,PD.NoOfDays,PD.NoOfNights,
--	Pc.PackageName
--	FROM BookPackage BP
--	LEFT JOIN Payment P
--	ON BP.BookingId=P.BookingId
--	LEFT JOIN Accomodation A
--	ON BP.BookingId=A.BookingId
--	LEFT JOIN PackageDetails PD
--	ON BP.PackageId=PD.PackageDetailsId
--	LEFT JOIN Package Pc
--	ON PD.PackageId=Pc.PackageId
--	WHERE BP.EmailId=@EmailId
--	);
--GO

CREATE PROCEDURE [usp_ViewBookedPackages]
(
@EmailId VARCHAR(50),
@BookingId INT OUT,
@NumberOfAdults INT OUT,
@NumberOfChildren INT OUT,
@DateOfTravel DATE OUT,
@TotalAmount BIGINT OUT,
@HotelName VARCHAR(50) OUT,
@NoOfRooms VARCHAR(50) OUT,
@PlacesToVisit VARCHAR(100) OUT,
@NoOfDays INT OUT,
@NoOfNights INT OUT,
@PackageName VARCHAR(50) OUT
)
AS
BEGIN
	BEGIN TRY
		SELECT
		@BookingId = BP.BookingId, @NumberOfAdults = BP.NumberOfAdults, @NumberOfChildren = BP.NumberOfChildren, @DateOfTravel = BP.DateOfTravel,
		@TotalAmount = P.TotalAmount,
		@HotelName = A.HotelName, @NoOfRooms = A.NoOfRooms,
		@PlacesToVisit = PD.PlacesToVisit, @NoOfDays = PD.NoOfDays, @NoOfNights = PD.NoOfNights,
		@PackageName = Pc.PackageName
		FROM BookPackage BP
		LEFT JOIN Payment P
		ON BP.BookingId=P.BookingId
		LEFT JOIN Accomodation A
		ON BP.BookingId=A.BookingId
		LEFT JOIN PackageDetails PD
		ON BP.PackageId=PD.PackageDetailsId
		LEFT JOIN Package Pc
		ON PD.PackageId=Pc.PackageId
		WHERE BP.EmailId=@EmailId
		Return 1;
	END TRY
	BEGIN CATCH
		RETURN -99
	END CATCH
END
GO

select * from Customer

GO
CREATE FUNCTION fn_ValidateAllLogins
(
    @EmailId VARCHAR(50),
    @Password VARCHAR(20)
)
RETURNS INT
AS
BEGIN
    DECLARE @Result INT;

    IF EXISTS (
        SELECT 1 FROM Customer
        WHERE EmailId = @EmailId AND UserPassword = @Password)
		  BEGIN
        SET @Result = 1;
		END
    
    ELSE IF EXISTS (
       
        SELECT 1 FROM Employee 
        WHERE EmailId = @EmailId AND [Password] = @Password)
		BEGIN
			SET @Result = 2;
		END
    
  
    ELSE
    BEGIN
        SET @Result = 0; 
    END

    RETURN @Result;
END;
GO

