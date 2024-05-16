CREATE DATABASE  IF NOT EXISTS `fit` ;
USE `fit`;

DROP TABLE IF EXISTS `Account_Mesagge`;
CREATE TABLE `Account_Mesagge` (
    `id`            bigint          NOT NULL AUTO_INCREMENT COMMENT '主键',
    `user_id`       bigint          NOT NULL COMMENT '用户id',
    `sex`           varchar(2)      COLLATE utf8_bin DEFAULT NULL COMMENT '性别',
    `phone`         varchar(11)     COLLATE utf8_bin NOT NULL COMMENT '手机号',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='地址簿';

-- DROP TABLE IF EXISTS `Account_Mesagge`;
-- CREATE TABLE `Account_Mesagge` (
--                                 `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
--                                 `user_id` bigint NOT NULL COMMENT '用户id',
--                                 `consignee` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '收货人',
--                                 `sex` varchar(2) COLLATE utf8_bin DEFAULT NULL COMMENT '性别',
--                                 `phone` varchar(11) COLLATE utf8_bin NOT NULL COMMENT '手机号',
--                                 `province_code` varchar(12) CHARACTER SET utf8mb4  DEFAULT NULL COMMENT '省级区划编号',
--                                 `province_name` varchar(32) CHARACTER SET utf8mb4  DEFAULT NULL COMMENT '省级名称',
--                                 `city_code` varchar(12) CHARACTER SET utf8mb4  DEFAULT NULL COMMENT '市级区划编号',
--                                 `city_name` varchar(32) CHARACTER SET utf8mb4  DEFAULT NULL COMMENT '市级名称',
--                                 `district_code` varchar(12) CHARACTER SET utf8mb4  DEFAULT NULL COMMENT '区级区划编号',
--                                 `district_name` varchar(32) CHARACTER SET utf8mb4  DEFAULT NULL COMMENT '区级名称',
--                                 `detail` varchar(200) CHARACTER SET utf8mb4  DEFAULT NULL COMMENT '详细地址',
--                                 `label` varchar(100) CHARACTER SET utf8mb4  DEFAULT NULL COMMENT '标签',
--                                 `is_default` tinyint(1) NOT NULL DEFAULT '0' COMMENT '默认 0 否 1是',
--                                 PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin COMMENT='地址簿';