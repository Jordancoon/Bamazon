DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL DEFAULT '',
  `department_name` varchar(255) NOT NULL DEFAULT '',
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES
	(1,'Cards Against Humanity','Toys & Games',25.00,10),
	(2,'Echo Dot','Electronics',49.99,9),
	(3,'Nerf N-Strike Elite Strongarm Blaster','Toys & Games',12.99,6),
	(4,'Ready Player One','Books',9.99,4),
	(5,'The Handmaid\'s Tale','Books',9.69,4),
	(6,'Samsung Countertop Microwave Oven','Appliances',99.00,8),
	(7,'Crocs Unisex Classic Clog','Clothing, Shoes & Jewelry',31.53,5),
	(8,'Anker 4-Port USB 3.0 Ultra Slim Data Hub','Electronics',8.99,9),
	(9,'Bounty Select-a-Size Paper Towels','Health & Household',23.99,6),
	(10,'Dr. Elsey\'s Precious Cat Ultra Cat Litter','Pet Supplies',29.00,8),
	(11,'Jenga Classic Game','Toys & Games',10.27,10),
	(12,'Maxboost Fidget Spinner','Toys & Games',6.99,10),
	(13,'Lenovo Yoga Tab 3','Electronics',169.99,10),
	(14,'HP OfficeJet 4650 Photo Printer','Electronics',59.99,10),
	(15,'iRobot Roomba 980','Appliances',898.00,10),
	(16,'Crock-Pot 6-Quart Slow Cooker','Appliances',35.99,10),
	(17,'Ninja Professional Blender','Appliances',118.99,10),
	(18,'Snow Crash','Books',8.23,10),
	(19,'Harry Potter and the Sorcerer\'s Stone','Books',5.45,10),
	(20,'Lark & Ro Women\'s Sleeveless A-Line Dress','Clothing, Shoes & Jewelry',79.00,10),
	(21,'IZOD Men\'s Solid Polo','Clothing, Shoes & Jewelry',18.08,10),
	(22,'Calvin Klein Men\'s Leather Fashion Sneaker','Clothing, Shoes & Jewelry',98.00,10),
	(23,'Pampers Swaddlers Diapers','Health & Household',35.39,10),
	(24,'simplehuman Code H Recycling Liners','Health & Household',38.01,10),
	(25,'Kong Extreme Dog Toy','Pet Supplies',10.70,10),
	(26,'Wagner\'s Variety Blend Birdseed','Pet Supplies',19.98,10);

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;