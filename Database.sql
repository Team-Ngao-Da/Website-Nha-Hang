USE [master]
GO
/****** Object:  Database [backend]    Script Date: 9/27/2019 9:52:31 AM ******/
CREATE DATABASE [backend]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'backend', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\backend.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'backend_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\backend_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [backend] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [backend].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [backend] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [backend] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [backend] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [backend] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [backend] SET ARITHABORT OFF 
GO
ALTER DATABASE [backend] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [backend] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [backend] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [backend] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [backend] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [backend] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [backend] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [backend] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [backend] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [backend] SET  DISABLE_BROKER 
GO
ALTER DATABASE [backend] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [backend] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [backend] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [backend] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [backend] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [backend] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [backend] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [backend] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [backend] SET  MULTI_USER 
GO
ALTER DATABASE [backend] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [backend] SET DB_CHAINING OFF 
GO
ALTER DATABASE [backend] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [backend] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [backend] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [backend] SET QUERY_STORE = OFF
GO
USE [backend]
GO
/****** Object:  Table [dbo].[BILL_DETAILS]    Script Date: 9/27/2019 9:52:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BILL_DETAILS](
	[B_ID] [int] NULL,
	[M_ID] [int] NULL,
	[BD_Count] [int] NULL,
	[BD_Price] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BILLS]    Script Date: 9/27/2019 9:52:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BILLS](
	[B_ID] [int] IDENTITY(1,1) NOT NULL,
	[E_ID] [int] NULL,
	[B_Date] [datetime] NULL,
	[B_Payment] [float] NULL,
 CONSTRAINT [PK_BILLS] PRIMARY KEY CLUSTERED 
(
	[B_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CANCEL_MATERIALS]    Script Date: 9/27/2019 9:52:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CANCEL_MATERIALS](
	[E_ID] [int] NULL,
	[MT_ID] [int] NULL,
	[C_MA_Date] [datetime] NULL,
	[C_MA_Reason] [varchar](255) NULL,
	[C_MA_Count] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EMPLOYEES]    Script Date: 9/27/2019 9:52:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EMPLOYEES](
	[E_ID] [int] IDENTITY(1,1) NOT NULL,
	[E_Name] [nvarchar](50) NULL,
	[E_FullName] [varchar](50) NULL,
	[E_Position] [nvarchar](25) NULL,
	[E_Gender] [nvarchar](50) NULL,
 CONSTRAINT [PK_EMPLOYEES] PRIMARY KEY CLUSTERED 
(
	[E_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[INGREDIENTS]    Script Date: 9/27/2019 9:52:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[INGREDIENTS](
	[M_ID] [int] NULL,
	[MA_ID] [int] NULL,
	[I_Count] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MATERIAL_TYPES]    Script Date: 9/27/2019 9:52:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MATERIAL_TYPES](
	[MA_T_ID] [int] IDENTITY(1,1) NOT NULL,
	[MA_T_Name] [nvarchar](50) NULL,
 CONSTRAINT [PK_MATERIAL_TYPES] PRIMARY KEY CLUSTERED 
(
	[MA_T_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MATERIALS]    Script Date: 9/27/2019 9:52:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MATERIALS](
	[MA_ID] [int] IDENTITY(1,1) NOT NULL,
	[MA_T_ID] [int] NULL,
	[MA_Name] [nvarchar](50) NULL,
	[MA_Supplie] [nvarchar](25) NULL,
	[MA_Unit] [nvarchar](10) NULL,
	[MA_Count] [int] NULL,
	[MA_Cost] [float] NULL,
	[MA_Expiration_Date] [datetime] NULL,
	[MA_Import_Date] [datetime] NULL,
 CONSTRAINT [PK_MATERIALS] PRIMARY KEY CLUSTERED 
(
	[MA_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MENU_TYPES]    Script Date: 9/27/2019 9:52:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MENU_TYPES](
	[MT_ID] [int] IDENTITY(1,1) NOT NULL,
	[MT_Name] [nvarchar](50) NULL,
 CONSTRAINT [PK_MENU_TYPES] PRIMARY KEY CLUSTERED 
(
	[MT_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MENUS]    Script Date: 9/27/2019 9:52:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MENUS](
	[M_ID] [int] IDENTITY(1,1) NOT NULL,
	[MT_ID] [int] NULL,
	[M_Name] [nvarchar](50) NULL,
	[M_Price] [float] NULL,
	[M_Img] [varchar](255) NULL,
 CONSTRAINT [PK_MENU] PRIMARY KEY CLUSTERED 
(
	[M_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ORDERS]    Script Date: 9/27/2019 9:52:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ORDERS](
	[O_ID] [int] IDENTITY(1,1) NOT NULL,
	[M_ID] [int] NULL,
	[TD_ID] [int] NULL,
	[O_Count] [int] NULL,
 CONSTRAINT [PK_ORDERS] PRIMARY KEY CLUSTERED 
(
	[O_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PROMOTES]    Script Date: 9/27/2019 9:52:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PROMOTES](
	[P_ID] [int] IDENTITY(1,1) NOT NULL,
	[M_ID] [int] NULL,
	[P_Discount] [int] NULL,
	[P_Content] [nvarchar](255) NULL,
	[P_Date_Start] [datetime] NULL,
	[P_Date_End] [datetime] NULL,
 CONSTRAINT [PK_PROMOTES] PRIMARY KEY CLUSTERED 
(
	[P_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TABLE_DETAILS]    Script Date: 9/27/2019 9:52:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TABLE_DETAILS](
	[TD_ID] [int] IDENTITY(1,1) NOT NULL,
	[TD_Position] [nvarchar](50) NULL,
 CONSTRAINT [PK_TABLE_DETAILS] PRIMARY KEY CLUSTERED 
(
	[TD_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USERS]    Script Date: 9/27/2019 9:52:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USERS](
	[U_ID] [int] IDENTITY(1,1) NOT NULL,
	[U_UserName] [nvarchar](255) NULL,
	[U_Password] [nvarchar](255) NULL,
	[fullName] [nvarchar](255) NULL,
	[E_ID] [int] NULL,
 CONSTRAINT [PK_USERS] PRIMARY KEY CLUSTERED 
(
	[U_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[BILLS] ON 

INSERT [dbo].[BILLS] ([B_ID], [E_ID], [B_Date], [B_Payment]) VALUES (1, 1, CAST(N'2019-09-11T12:32:03.000' AS DateTime), 5300001)
INSERT [dbo].[BILLS] ([B_ID], [E_ID], [B_Date], [B_Payment]) VALUES (2, 2, CAST(N'2019-09-11T12:32:03.000' AS DateTime), 320000)
INSERT [dbo].[BILLS] ([B_ID], [E_ID], [B_Date], [B_Payment]) VALUES (6, 3, CAST(N'2019-09-11T12:32:03.000' AS DateTime), 325000)
INSERT [dbo].[BILLS] ([B_ID], [E_ID], [B_Date], [B_Payment]) VALUES (7, 4, CAST(N'2019-09-11T12:32:03.000' AS DateTime), 210000)
INSERT [dbo].[BILLS] ([B_ID], [E_ID], [B_Date], [B_Payment]) VALUES (8, 1, CAST(N'2019-09-11T12:32:03.000' AS DateTime), 320000)
INSERT [dbo].[BILLS] ([B_ID], [E_ID], [B_Date], [B_Payment]) VALUES (9, 3, CAST(N'2019-09-11T12:32:03.000' AS DateTime), 5300001)
INSERT [dbo].[BILLS] ([B_ID], [E_ID], [B_Date], [B_Payment]) VALUES (10, 2, CAST(N'2019-09-11T12:32:03.000' AS DateTime), 210000)
SET IDENTITY_INSERT [dbo].[BILLS] OFF
SET IDENTITY_INSERT [dbo].[EMPLOYEES] ON 

INSERT [dbo].[EMPLOYEES] ([E_ID], [E_Name], [E_FullName], [E_Position], [E_Gender]) VALUES (1, N'Bạch Tuấn Hợp', NULL, N'Quan ly', N'nam')
INSERT [dbo].[EMPLOYEES] ([E_ID], [E_Name], [E_FullName], [E_Position], [E_Gender]) VALUES (2, N'Lữ Phước Hưng', NULL, N'Nhân viên', N'nam')
INSERT [dbo].[EMPLOYEES] ([E_ID], [E_Name], [E_FullName], [E_Position], [E_Gender]) VALUES (3, N'Lâm Mỹ', NULL, N'Thu Ngân', N'nữ')
INSERT [dbo].[EMPLOYEES] ([E_ID], [E_Name], [E_FullName], [E_Position], [E_Gender]) VALUES (4, N'Trịnh Mạnh Hoàng', NULL, N'Dau bep', N'nam')
SET IDENTITY_INSERT [dbo].[EMPLOYEES] OFF
SET IDENTITY_INSERT [dbo].[MATERIAL_TYPES] ON 

INSERT [dbo].[MATERIAL_TYPES] ([MA_T_ID], [MA_T_Name]) VALUES (1, N'MT2')
INSERT [dbo].[MATERIAL_TYPES] ([MA_T_ID], [MA_T_Name]) VALUES (2, N'MA')
INSERT [dbo].[MATERIAL_TYPES] ([MA_T_ID], [MA_T_Name]) VALUES (3, N'MB')
SET IDENTITY_INSERT [dbo].[MATERIAL_TYPES] OFF
SET IDENTITY_INSERT [dbo].[MATERIALS] ON 

INSERT [dbo].[MATERIALS] ([MA_ID], [MA_T_ID], [MA_Name], [MA_Supplie], [MA_Unit], [MA_Count], [MA_Cost], [MA_Expiration_Date], [MA_Import_Date]) VALUES (2, 2, N'ABCD', N'VBN', N'CVB', 324, 3.4, CAST(N'2019-12-11T12:32:11.000' AS DateTime), CAST(N'2019-12-11T22:32:11.000' AS DateTime))
INSERT [dbo].[MATERIALS] ([MA_ID], [MA_T_ID], [MA_Name], [MA_Supplie], [MA_Unit], [MA_Count], [MA_Cost], [MA_Expiration_Date], [MA_Import_Date]) VALUES (3, 1, N'ABC', N'VBN', N'CVB', 324, 3.4, CAST(N'2019-12-11T12:32:11.000' AS DateTime), CAST(N'2019-12-11T22:32:11.000' AS DateTime))
INSERT [dbo].[MATERIALS] ([MA_ID], [MA_T_ID], [MA_Name], [MA_Supplie], [MA_Unit], [MA_Count], [MA_Cost], [MA_Expiration_Date], [MA_Import_Date]) VALUES (5, 3, N'ty', N'ds', N'sf', 32, 12, CAST(N'2019-12-11T12:32:11.000' AS DateTime), CAST(N'2019-12-11T22:32:11.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[MATERIALS] OFF
SET IDENTITY_INSERT [dbo].[MENU_TYPES] ON 

INSERT [dbo].[MENU_TYPES] ([MT_ID], [MT_Name]) VALUES (1, N'ca phe')
INSERT [dbo].[MENU_TYPES] ([MT_ID], [MT_Name]) VALUES (2, N'tra ngot')
INSERT [dbo].[MENU_TYPES] ([MT_ID], [MT_Name]) VALUES (4, N'com')
INSERT [dbo].[MENU_TYPES] ([MT_ID], [MT_Name]) VALUES (5, N'Canh')
INSERT [dbo].[MENU_TYPES] ([MT_ID], [MT_Name]) VALUES (6, N'khai vi')
INSERT [dbo].[MENU_TYPES] ([MT_ID], [MT_Name]) VALUES (1008, N'trà ngọt')
INSERT [dbo].[MENU_TYPES] ([MT_ID], [MT_Name]) VALUES (1009, N'thit heo')
INSERT [dbo].[MENU_TYPES] ([MT_ID], [MT_Name]) VALUES (1010, N'com')
INSERT [dbo].[MENU_TYPES] ([MT_ID], [MT_Name]) VALUES (1011, N'khai vị')
INSERT [dbo].[MENU_TYPES] ([MT_ID], [MT_Name]) VALUES (1012, N'qư')
SET IDENTITY_INSERT [dbo].[MENU_TYPES] OFF
SET IDENTITY_INSERT [dbo].[MENUS] ON 

INSERT [dbo].[MENUS] ([M_ID], [MT_ID], [M_Name], [M_Price], [M_Img]) VALUES (1, 1, N'Khai vị/  Starter', 58000, NULL)
INSERT [dbo].[MENUS] ([M_ID], [MT_ID], [M_Name], [M_Price], [M_Img]) VALUES (2, 1, N'Cà phê sữa', 68000, NULL)
INSERT [dbo].[MENUS] ([M_ID], [MT_ID], [M_Name], [M_Price], [M_Img]) VALUES (3, 1, N'Bạc xỉu', 68000, NULL)
INSERT [dbo].[MENUS] ([M_ID], [MT_ID], [M_Name], [M_Price], [M_Img]) VALUES (4, 1, N'Cà phê đá', 58000, NULL)
INSERT [dbo].[MENUS] ([M_ID], [MT_ID], [M_Name], [M_Price], [M_Img]) VALUES (5, 2, N'Trà tắc vải', 58000, NULL)
INSERT [dbo].[MENUS] ([M_ID], [MT_ID], [M_Name], [M_Price], [M_Img]) VALUES (6, 2, N'Trà hạt é lá dứa', 58000, NULL)
INSERT [dbo].[MENUS] ([M_ID], [MT_ID], [M_Name], [M_Price], [M_Img]) VALUES (7, 2, N'Trà đen-thạch đào', 58000, NULL)
INSERT [dbo].[MENUS] ([M_ID], [MT_ID], [M_Name], [M_Price], [M_Img]) VALUES (8, 1009, N'Thịt heo kho tộ', 118000, NULL)
INSERT [dbo].[MENUS] ([M_ID], [MT_ID], [M_Name], [M_Price], [M_Img]) VALUES (9, 1009, N'Sườn nướng sốt tiêu đen', 138000, NULL)
INSERT [dbo].[MENUS] ([M_ID], [MT_ID], [M_Name], [M_Price], [M_Img]) VALUES (10, 1009, N'Sườn nướng mật ong', 138000, NULL)
INSERT [dbo].[MENUS] ([M_ID], [MT_ID], [M_Name], [M_Price], [M_Img]) VALUES (11, 1009, N'Cơm trắng', 18000, NULL)
INSERT [dbo].[MENUS] ([M_ID], [MT_ID], [M_Name], [M_Price], [M_Img]) VALUES (12, 4, N'Cơm rang bò-cà chua', 128000, NULL)
INSERT [dbo].[MENUS] ([M_ID], [MT_ID], [M_Name], [M_Price], [M_Img]) VALUES (13, 4, N'Cơm sườn ba rọi', 200000, NULL)
INSERT [dbo].[MENUS] ([M_ID], [MT_ID], [M_Name], [M_Price], [M_Img]) VALUES (14, 5, N'Súp bắt tôm', 65000, NULL)
INSERT [dbo].[MENUS] ([M_ID], [MT_ID], [M_Name], [M_Price], [M_Img]) VALUES (15, 5, N'Canh tôm bầu', 108000, NULL)
INSERT [dbo].[MENUS] ([M_ID], [MT_ID], [M_Name], [M_Price], [M_Img]) VALUES (16, 5, N'Canh chua cá dứa', 128000, NULL)
INSERT [dbo].[MENUS] ([M_ID], [MT_ID], [M_Name], [M_Price], [M_Img]) VALUES (17, 6, N'Cánh gà sốt me', 200000, NULL)
INSERT [dbo].[MENUS] ([M_ID], [MT_ID], [M_Name], [M_Price], [M_Img]) VALUES (18, 6, N'Thác lác chiên thì là', 138000, NULL)
SET IDENTITY_INSERT [dbo].[MENUS] OFF
SET IDENTITY_INSERT [dbo].[PROMOTES] ON 

INSERT [dbo].[PROMOTES] ([P_ID], [M_ID], [P_Discount], [P_Content], [P_Date_Start], [P_Date_End]) VALUES (1, 1, 3, N'ABC', CAST(N'2019-10-09T12:02:32.000' AS DateTime), CAST(N'2019-10-22T12:11:55.000' AS DateTime))
INSERT [dbo].[PROMOTES] ([P_ID], [M_ID], [P_Discount], [P_Content], [P_Date_Start], [P_Date_End]) VALUES (2, 2, 2, N'BNc', CAST(N'2019-10-09T12:02:32.000' AS DateTime), CAST(N'2019-10-11T12:21:11.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[PROMOTES] OFF
SET IDENTITY_INSERT [dbo].[TABLE_DETAILS] ON 

INSERT [dbo].[TABLE_DETAILS] ([TD_ID], [TD_Position]) VALUES (1, N'ban 1')
INSERT [dbo].[TABLE_DETAILS] ([TD_ID], [TD_Position]) VALUES (1003, N'ban 2')
SET IDENTITY_INSERT [dbo].[TABLE_DETAILS] OFF
SET IDENTITY_INSERT [dbo].[USERS] ON 

INSERT [dbo].[USERS] ([U_ID], [U_UserName], [U_Password], [fullName], [E_ID]) VALUES (1, N'Tuan Hop', N'3627909a29c31381a071ec27f7c9ca97726182aed29a7ddd2e54353322cfb30abb9e3a6df2ac2c20fe23436311d678564d0c8d305930575f60e2d3d048184d79', N'Bach Tuan Hop', NULL)
INSERT [dbo].[USERS] ([U_ID], [U_UserName], [U_Password], [fullName], [E_ID]) VALUES (2, N'TranDat', N'3627909a29c31381a071ec27f7c9ca97726182aed29a7ddd2e54353322cfb30abb9e3a6df2ac2c20fe23436311d678564d0c8d305930575f60e2d3d048184d79', N'Tran Dat', NULL)
SET IDENTITY_INSERT [dbo].[USERS] OFF
ALTER TABLE [dbo].[BILL_DETAILS]  WITH CHECK ADD  CONSTRAINT [FK_BILL_DETAILS_BILLS] FOREIGN KEY([B_ID])
REFERENCES [dbo].[BILLS] ([B_ID])
GO
ALTER TABLE [dbo].[BILL_DETAILS] CHECK CONSTRAINT [FK_BILL_DETAILS_BILLS]
GO
ALTER TABLE [dbo].[BILL_DETAILS]  WITH CHECK ADD  CONSTRAINT [FK_BILL_DETAILS_MENU] FOREIGN KEY([M_ID])
REFERENCES [dbo].[MENUS] ([M_ID])
GO
ALTER TABLE [dbo].[BILL_DETAILS] CHECK CONSTRAINT [FK_BILL_DETAILS_MENU]
GO
ALTER TABLE [dbo].[BILLS]  WITH CHECK ADD  CONSTRAINT [FK_BILLS_EMPLOYEES] FOREIGN KEY([E_ID])
REFERENCES [dbo].[EMPLOYEES] ([E_ID])
GO
ALTER TABLE [dbo].[BILLS] CHECK CONSTRAINT [FK_BILLS_EMPLOYEES]
GO
ALTER TABLE [dbo].[CANCEL_MATERIALS]  WITH CHECK ADD  CONSTRAINT [FK_CANCEL_MATERIALS_EMPLOYEES] FOREIGN KEY([E_ID])
REFERENCES [dbo].[EMPLOYEES] ([E_ID])
GO
ALTER TABLE [dbo].[CANCEL_MATERIALS] CHECK CONSTRAINT [FK_CANCEL_MATERIALS_EMPLOYEES]
GO
ALTER TABLE [dbo].[CANCEL_MATERIALS]  WITH CHECK ADD  CONSTRAINT [FK_CANCEL_MATERIALS_MENU_TYPES] FOREIGN KEY([MT_ID])
REFERENCES [dbo].[MENU_TYPES] ([MT_ID])
GO
ALTER TABLE [dbo].[CANCEL_MATERIALS] CHECK CONSTRAINT [FK_CANCEL_MATERIALS_MENU_TYPES]
GO
ALTER TABLE [dbo].[INGREDIENTS]  WITH CHECK ADD  CONSTRAINT [FK_INGREDIENTS_MATERIALS] FOREIGN KEY([MA_ID])
REFERENCES [dbo].[MATERIALS] ([MA_ID])
GO
ALTER TABLE [dbo].[INGREDIENTS] CHECK CONSTRAINT [FK_INGREDIENTS_MATERIALS]
GO
ALTER TABLE [dbo].[INGREDIENTS]  WITH CHECK ADD  CONSTRAINT [FK_INGREDIENTS_MENU] FOREIGN KEY([M_ID])
REFERENCES [dbo].[MENUS] ([M_ID])
GO
ALTER TABLE [dbo].[INGREDIENTS] CHECK CONSTRAINT [FK_INGREDIENTS_MENU]
GO
ALTER TABLE [dbo].[MATERIALS]  WITH CHECK ADD  CONSTRAINT [FK_MATERIALS_MATERIAL_TYPES] FOREIGN KEY([MA_T_ID])
REFERENCES [dbo].[MATERIAL_TYPES] ([MA_T_ID])
GO
ALTER TABLE [dbo].[MATERIALS] CHECK CONSTRAINT [FK_MATERIALS_MATERIAL_TYPES]
GO
ALTER TABLE [dbo].[MENUS]  WITH CHECK ADD  CONSTRAINT [FK_MENU_MENU_TYPES] FOREIGN KEY([MT_ID])
REFERENCES [dbo].[MENU_TYPES] ([MT_ID])
GO
ALTER TABLE [dbo].[MENUS] CHECK CONSTRAINT [FK_MENU_MENU_TYPES]
GO
ALTER TABLE [dbo].[ORDERS]  WITH CHECK ADD  CONSTRAINT [FK_ORDERS_MENU] FOREIGN KEY([M_ID])
REFERENCES [dbo].[MENUS] ([M_ID])
GO
ALTER TABLE [dbo].[ORDERS] CHECK CONSTRAINT [FK_ORDERS_MENU]
GO
ALTER TABLE [dbo].[ORDERS]  WITH CHECK ADD  CONSTRAINT [FK_ORDERS_TABLE_DETAILS] FOREIGN KEY([TD_ID])
REFERENCES [dbo].[TABLE_DETAILS] ([TD_ID])
GO
ALTER TABLE [dbo].[ORDERS] CHECK CONSTRAINT [FK_ORDERS_TABLE_DETAILS]
GO
ALTER TABLE [dbo].[PROMOTES]  WITH CHECK ADD  CONSTRAINT [FK_PROMOTES_MENU] FOREIGN KEY([M_ID])
REFERENCES [dbo].[MENUS] ([M_ID])
GO
ALTER TABLE [dbo].[PROMOTES] CHECK CONSTRAINT [FK_PROMOTES_MENU]
GO
ALTER TABLE [dbo].[USERS]  WITH CHECK ADD  CONSTRAINT [FK_USERS_EMPLOYEES] FOREIGN KEY([E_ID])
REFERENCES [dbo].[EMPLOYEES] ([E_ID])
GO
ALTER TABLE [dbo].[USERS] CHECK CONSTRAINT [FK_USERS_EMPLOYEES]
GO
USE [master]
GO
ALTER DATABASE [backend] SET  READ_WRITE 
GO
