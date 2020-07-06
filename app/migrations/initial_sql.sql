--
-- Database: `my_service`
--

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id_inventory` int(11) NOT NULL,
  `codeReference` text NOT NULL,
  `inventory_name` varchar(255) NOT NULL,
  `inventory_price` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `picture` text NOT NULL,
  `position` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
-- --------------------------------------------------------

--
-- Table structure for table `merchant`
--

CREATE TABLE `merchant` (
  `id_merchant` int(11) NOT NULL,
  `name` text NOT NULL,
  `code` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` text NOT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ms_panel_users`
--

CREATE TABLE `ms_panel_users` (
  `id_panel_users` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(11) NOT NULL,
  `active` tinyint(11) NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ms_panel_users`
--

INSERT INTO `ms_panel_users` (`id_panel_users`, `username`, `password`, `role`, `active`, `last_login`, `created_date`, `updated_date`) VALUES
(2, 'administrator', '$2b$10$g2JUB.o4DOa35dotoKPpOebh.6C0qrD1KUtKW9tLsF6AhefUt.KrG', 1, 1, '2020-07-03 08:41:52', '2019-11-03 21:11:45', '2020-07-03 08:41:52');

-- --------------------------------------------------------

--
-- Table structure for table `ms_privacy`
--

CREATE TABLE `ms_privacy` (
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transactionitem`
--

CREATE TABLE `transactionitem` (
  `id_item` int(11) NOT NULL,
  `username` int(11) NOT NULL,
  `id_merchant` int(11) NOT NULL,
  `id_branch` int(11) NOT NULL,
  `name_item` text NOT NULL,
  `price_item` text NOT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `trhistory`
--

CREATE TABLE `trhistory` (
  `id_history` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `id_merchant` int(11) NOT NULL,
  `id_branch` int(11) NOT NULL,
  `name_item` text NOT NULL,
  `price_item` text NOT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `trmerchantbranch`
--

CREATE TABLE `trmerchantbranch` (
  `id_branch` int(11) NOT NULL,
  `id_merchant` int(11) NOT NULL,
  `branch_name` varchar(255) NOT NULL,
  `branch_address` text NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tr_panel_users_groups`
--

CREATE TABLE `tr_panel_users_groups` (
  `id_users_groups` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `id_groups` int(11) NOT NULL,
  `users_groups_created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `users_groups_created_by` int(11) NOT NULL,
  `users_groups_updated_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `users_groups_updated_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` text NOT NULL,
  `birthday` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `address` text NOT NULL,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `product_cart` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `id_merchant` int(11) NOT NULL,
  `id_branch` int(11) NOT NULL,
  `codeReference` text NOT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--
ALTER TABLE `product_cart`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `product_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT;


--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id_inventory`);

--
-- Indexes for table `merchant`
--
ALTER TABLE `merchant`
  ADD PRIMARY KEY (`id_merchant`);

--
-- Indexes for table `ms_panel_users`
--
ALTER TABLE `ms_panel_users`
  ADD PRIMARY KEY (`id_panel_users`);

--
-- Indexes for table `transactionitem`
--
ALTER TABLE `transactionitem`
  ADD PRIMARY KEY (`id_item`);

--
-- Indexes for table `trhistory`
--
ALTER TABLE `trhistory`
  ADD PRIMARY KEY (`id_history`);

--
-- Indexes for table `trmerchantbranch`
--
ALTER TABLE `trmerchantbranch`
  ADD PRIMARY KEY (`id_branch`);

--
-- Indexes for table `tr_panel_users_groups`
--
ALTER TABLE `tr_panel_users_groups`
  ADD PRIMARY KEY (`id_users_groups`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id_inventory` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `merchant`
--
ALTER TABLE `merchant`
  MODIFY `id_merchant` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ms_panel_users`
--
ALTER TABLE `ms_panel_users`
  MODIFY `id_panel_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transactionitem`
--
ALTER TABLE `transactionitem`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trhistory`
--
ALTER TABLE `trhistory`
  MODIFY `id_history` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `trmerchantbranch`
--
ALTER TABLE `trmerchantbranch`
  MODIFY `id_branch` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tr_panel_users_groups`
--
ALTER TABLE `tr_panel_users_groups`
  MODIFY `id_users_groups` int(11) NOT NULL AUTO_INCREMENT;