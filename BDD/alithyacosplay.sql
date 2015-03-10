-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mar 10 Mars 2015 à 13:58
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `alithyacosplay`
--

-- --------------------------------------------------------

--
-- Structure de la table `blog_comments`
--

CREATE TABLE IF NOT EXISTS `blog_comments` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_post_id` int(11) NOT NULL,
  `comment_author_name` tinytext NOT NULL,
  `comment_author_email` varchar(100) NOT NULL,
  `comment_author_url` varchar(200) NOT NULL,
  `comment_author_IP` varchar(100) NOT NULL,
  `comment_date` datetime NOT NULL,
  `comment_content` text NOT NULL,
  `comment_approved` tinyint(1) NOT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Contenu de la table `blog_comments`
--

INSERT INTO `blog_comments` (`comment_id`, `comment_post_id`, `comment_author_name`, `comment_author_email`, `comment_author_url`, `comment_author_IP`, `comment_date`, `comment_content`, `comment_approved`) VALUES
(1, 1, 'nomdelauteur', 'whats_up_people-9466@hotmail.fr', 'www.truc.me', '', '2014-11-24 04:35:17', 'testText testText testText testText testText testText testText testText testText testText testText testText testText testText ', 1),
(2, 1, 'nomJYTYFYUIUGHK', 'bigugu@hudzhaiuiuaf.fuizehf', 'hfifhfezhiufhz.cezo', '::1', '2014-11-25 08:42:55', 'y-trdtrdy4865', 1),
(3, 1, 'nomJYTYFYUIUGHK', 'bigugu@hudzhaiuiuaf.fuizehf', 'hfifhfezhiufhz.cezo', '::1', '2014-11-25 08:54:12', 'y-trdtrdy4865', 1),
(4, 1, 'hiruhzeui 59584', 'hazÃ§u', 'u ezaezeaez ', '::1', '2014-11-25 08:56:29', 'arzrzarazÃ§Ã Ã§_Ã§g-gg -&quot;&quot;hyugeyz', 1),
(5, 1, 'hiruhzeui 59584', 'hazÃ§u', 'u ezaezeaez ', '::1', '2014-11-25 08:59:32', 'arzrzarazÃ§Ã Ã§_Ã§g-gg -&quot;&quot;hyugeyz', 1),
(6, 1, 'nomJYTYFYUIUGHK', 'bigugu@hudzhaiuiuaf.fuizehf', 'hfifhfezhiufhz.cezo', '::1', '2014-11-25 09:06:00', 'jthdytdjtrdjdjy 45456\r\nnfufty\r\n\r\n454', 1),
(7, 24, 'johann9466', 'whats_up_people-9466@hotmail.fr', 'www.truc.com', '::1', '2014-11-25 12:11:21', 'Messagezihiaua hazuiouaiour 69+5 \r\n\r\n\r\n alkjazuifgiuzaiufiagy egaziygfaf46a54 64z9a', 1),
(8, 1, 'ryu', 'truc@jdjdj.com', 'dkijfi@fjeuh.com', '::1', '2014-12-31 22:12:10', 'iohqfeuhoueihgi etuhaeuitho hrepuhour h', 1),
(9, 1, 'ryu', 'truc@jdjdj.com', 'dkijfi@fjeuh.com', '::1', '2014-12-31 22:12:37', 'iohqfeuhoueihgi etuhaeuitho hrepuhour h', 1);

-- --------------------------------------------------------

--
-- Structure de la table `blog_posts`
--

CREATE TABLE IF NOT EXISTS `blog_posts` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `post_author_id` int(11) NOT NULL,
  `post_date` datetime NOT NULL,
  `post_content` longtext NOT NULL,
  `post_title` text NOT NULL,
  `post_excerpt` text NOT NULL,
  `post_category` int(11) NOT NULL,
  `post_modified` datetime NOT NULL,
  `post_apercu_image` varchar(100) NOT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Contenu de la table `blog_posts`
--

INSERT INTO `blog_posts` (`post_id`, `post_author_id`, `post_date`, `post_content`, `post_title`, `post_excerpt`, `post_category`, `post_modified`, `post_apercu_image`) VALUES
(1, 1, '2014-11-19 06:13:15', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Titre001', 'Lorem ipsum dolor sit amet, consectetur adipiscing...', 1, '2014-11-23 12:28:38', './images/articles/apercu_image/image_chat.png'),
(19, 1, '2014-11-21 18:19:09', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum posuere interdum. Curabitur at dictum elit. Curabitur facilisis sollicitudin risus, ac fringilla tellus imperdiet vel. Maecenas pharetra efficitur erat ut tempor. Fusce viverra neque a ornare dapibus. Proin pulvinar maximus suscipit. Vivamus eget consequat neque. Sed porta tortor risus, eu hendrerit elit posuere quis. Pellentesque felis quam, convallis at eleifend non, rhoncus sed ligula. Sed condimentum urna in purus aliquet mattis. Morbi justo risus, bibendum ac lacus et, maximus scelerisque dui.  Ut magna mi, tincidunt nec sem in, porta varius velit. Fusce molestie ex id scelerisque sodales. Aenean efficitur metus eget mauris consequat, non mollis lectus molestie. Integer ultrices mauris non ante faucibus, sed faucibus mauris feugiat. Vestibulum eget turpis eu felis pretium accumsan. Vestibulum eget odio a lacus facilisis fringilla semper nec mauris. Aliquam laoreet cursus cursus. Aenean tincidunt eros ac luctus tempus. Aenean a blandit nulla, at efficitur lacus. Suspendisse molestie libero justo, quis sollicitudin leo mollis in. Proin felis erat, dictum aliquam eros ac, iaculis congue ipsum. Aenean malesuada dapibus nulla ut ultricies. Sed semper purus in nisl egestas, ac cursus dui egestas. Aliquam sem ipsum, egestas in porttitor sit amet, luctus vel nunc. Ut luctus in ligula sit amet dapibus.  Fusce consectetur dui at urna vulputate, a pharetra tortor tempus. Maecenas augue nunc, molestie et interdum in, rhoncus et elit. Vivamus imperdiet est at orci elementum luctus. Pellentesque vulputate nunc ac rhoncus convallis. Mauris sit amet posuere purus. Maecenas quis mi non nulla rhoncus sodales. Donec suscipit eros dui, in aliquet mi volutpat vitae. Vestibulum rutrum odio nulla, a feugiat massa tincidunt ut.  Morbi iaculis vehicula convallis. Curabitur blandit felis ut sem volutpat rutrum. Nam ac tellus sit amet turpis sagittis rutrum ut et leo. Sed eget ligula nec turpis malesuada facilisis id non elit. Cras ultricies odio auctor enim pretium, a volutpat magna pellentesque. Quisque ultrices orci sit amet orci mattis, sed vulputate est dictum. Vestibulum pulvinar nunc eu turpis vestibulum, eget egestas erat posuere. Maecenas bibendum odio nisi, semper posuere purus egestas et. Praesent fermentum facilisis lobortis. Integer eget mollis metus, non fermentum ex. Sed maximus tincidunt mauris.  Curabitur in tortor sit amet erat ultrices condimentum sed suscipit augue. Etiam purus risus, ultrices non dignissim rutrum, aliquam a ipsum. Aliquam sit amet bibendum nibh. Proin vitae risus pellentesque nisl maximus blandit. Curabitur auctor orci a pulvinar elementum. Donec elementum scelerisque rhoncus. Praesent aliquam leo sit amet odio malesuada ullamcorper. Nulla consectetur urna et tellus imperdiet viverra sed at tellus. Praesent sed dolor quis ipsum fermentum lacinia id sed tortor. Vivamus nec luctus felis, ut porttitor leo. Aliquam a feugiat felis, ut ornare nisl. Donec vestibulum elit vel lobortis placerat. Phasellus et odio sem. Cras scelerisque magna turpis, imperdiet egestas urna maximus vel. Donec porttitor mauris dui, nec aliquam dui placerat ac.  Vestibulum ut tempus nulla, sed sagittis nisi. Maecenas dictum vulputate pretium. Mauris urna augue, dapibus rutrum laoreet et, posuere iaculis ante. Cras lorem elit, egestas nec vestibulum vel, dictum eget neque. Nulla hendrerit condimentum molestie. Vivamus nibh diam, viverra sit amet dignissim vitae, aliquet ac nibh. Cras eget porta augue. Nunc quis libero interdum, vulputate neque interdum, dictum sem. Cras ullamcorper arcu sit amet molestie volutpat. Etiam eget neque ac nibh dapibus vehicula consequat non dolor. Mauris ac lorem quis odio aliquam consequat. Aenean ullamcorper erat diam, vel iaculis velit luctus vel. Donec urna erat, sodales eu arcu gravida, condimentum faucibus quam. Maecenas pretium vel urna ut porta. Morbi non malesuada magna, vitae aliquet lacus. Etiam dignissim, metus ut cursus finibus, neque libero venenatis libero, non tempor metus libero ut dolor.  Cras a molestie tellus. Aliquam tempus nec lacus eu accumsan. Nam rutrum, velit eu finibus vulputate, ligula ipsum aliquet nisi, id tempus neque nibh a massa. Quisque accumsan, nibh et consectetur mollis, erat neque finibus nisi, lobortis vulputate lectus ante nec urna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In vulputate elit id turpis consectetur, eget luctus lectus aliquet. In rutrum arcu id ante viverra aliquet. Aliquam dui risus, consequat porttitor purus in, sagittis suscipit sapien. Sed a faucibus mauris. Mauris lobortis elit quis nisl bibendum, sit amet maximus nisl luctus. Vivamus lectus lectus, efficitur at erat dictum, pulvinar interdum risus. Vivamus hendrerit pellentesque nisi, eget luctus ligula tempus id. Duis sed posuere arcu, et facilisis magna. In vestibulum tortor eros, eget fermentum risus faucibus cursus. Morbi egestas rutrum sollicitudin. Nulla rutrum mauris non iaculis aliquet.  Nulla at suscipit sapien. Morbi sagittis ut leo in congue. Curabitur dictum quam augue. Vestibulum at urna vel magna auctor ornare. Suspendisse potenti. Nulla vitae lacus blandit mi ullamcorper malesuada. Aliquam gravida lorem mauris, nec rhoncus sapien blandit nec. Nullam metus enim, sagittis ornare massa sit amet, vulputate malesuada augue. Proin sollicitudin viverra neque a ornare. Aliquam maximus, velit in consectetur posuere, risus turpis lacinia dui, et tincidunt enim nisi non eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', 'Titre test Facebook modify', 'Lorem ipsum dolor sit amet, consectetur adipiscing...', 1, '2014-11-24 09:22:53', './images/articles/apercu_image/default.jpg'),
(25, 1, '2014-12-31 22:09:43', 'Fuck you Fuck you Fuck you Fuck you Fuck you Fuck you Fuck you Fuck you Fuck you Fuck you Fuck you Fuck you Fuck you Fuck you Fuck you Fuck you', 'Ryu vs Ken', 'Fuck you Fuck you Fuck you Fuck you Fuck you Fuck ...', 1, '0000-00-00 00:00:00', '');

-- --------------------------------------------------------

--
-- Structure de la table `blog_users`
--

CREATE TABLE IF NOT EXISTS `blog_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_login` varchar(60) NOT NULL,
  `user_pass` varchar(64) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_url` varchar(100) NOT NULL,
  `user_registered` datetime NOT NULL,
  `user_status` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `blog_users`
--

INSERT INTO `blog_users` (`user_id`, `user_login`, `user_pass`, `user_name`, `user_email`, `user_url`, `user_registered`, `user_status`) VALUES
(1, 'adminAlithyaCosplay', 'ab4f63f9ac65152575886860dde480a1', 'Administrator', '', '', '2014-11-21 12:14:02', 5),
(2, 'userTest', '2ff0b8e7c42451003caf62da438fe931', 'User', '', '', '2014-11-22 00:00:00', 0);

-- --------------------------------------------------------

--
-- Structure de la table `gallery_costumes`
--

CREATE TABLE IF NOT EXISTS `gallery_costumes` (
  `costume_id` int(11) NOT NULL AUTO_INCREMENT,
  `costume_name` varchar(50) NOT NULL,
  `costume_category` int(11) NOT NULL,
  `costume_apercu_image` varchar(100) NOT NULL,
  PRIMARY KEY (`costume_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Contenu de la table `gallery_costumes`
--

INSERT INTO `gallery_costumes` (`costume_id`, `costume_name`, `costume_category`, `costume_apercu_image`) VALUES
(1, 'Costume1', 1, ''),
(2, 'Costume2', 1, ''),
(3, 'Costume3', 1, ''),
(4, 'Costume4', 1, ''),
(5, 'Costume5', 1, ''),
(6, 'Costume6', 1, '');

-- --------------------------------------------------------

--
-- Structure de la table `gallery_photos`
--

CREATE TABLE IF NOT EXISTS `gallery_photos` (
  `photo_id` int(11) NOT NULL AUTO_INCREMENT,
  `photo_shooting_id` int(11) NOT NULL,
  `photo_costume_id` int(11) NOT NULL,
  `photo_file_path` varchar(100) NOT NULL,
  PRIMARY KEY (`photo_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Contenu de la table `gallery_photos`
--

INSERT INTO `gallery_photos` (`photo_id`, `photo_shooting_id`, `photo_costume_id`, `photo_file_path`) VALUES
(1, 1, 1, './img/image-1.jpg'),
(2, 1, 1, './img/image-2.jpg'),
(3, 1, 1, './img/image-3.jpg'),
(4, 1, 1, './img/image-4.jpg'),
(5, 1, 1, './img/image-1.jpg'),
(6, 1, 1, './img/image-4.jpg'),
(7, 3, 1, './img/image-3.jpg'),
(8, 4, 2, './img/image-2.jpg'),
(9, 6, 2, './img/image-3.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `gallery_shootings`
--

CREATE TABLE IF NOT EXISTS `gallery_shootings` (
  `shooting_id` int(11) NOT NULL AUTO_INCREMENT,
  `shooting_costume_id` int(11) NOT NULL,
  `shooting_name` varchar(100) NOT NULL,
  `shooting_photographer` varchar(100) NOT NULL,
  `shooting_date` date NOT NULL,
  PRIMARY KEY (`shooting_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Contenu de la table `gallery_shootings`
--

INSERT INTO `gallery_shootings` (`shooting_id`, `shooting_costume_id`, `shooting_name`, `shooting_photographer`, `shooting_date`) VALUES
(1, 1, 'Shooting1', 'Photographe1', '2014-11-19'),
(2, 1, 'Shooting2', 'Photographe1', '2014-11-20'),
(3, 1, 'Shooting3', 'Photographe2', '2014-11-22'),
(4, 1, 'Shooting4', 'Photographe2', '2014-11-21'),
(5, 2, 'Shooting5', 'Photographer5', '2014-11-18'),
(6, 2, 'Shooting6', 'Photographer4', '2014-11-19');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
