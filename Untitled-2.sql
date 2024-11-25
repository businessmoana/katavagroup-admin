
CREATE TABLE `chef` (
  `id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `ssn` varchar(100) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `company_email` varchar(50) DEFAULT NULL,
  `company_phone` varchar(50) DEFAULT NULL,
  `company_ein` varchar(100) DEFAULT NULL,
  `company_address` varchar(255) DEFAULT NULL,
  `company_city` varchar(50) DEFAULT NULL,
  `company_state` varchar(50) DEFAULT NULL,
  `company_zip_code` varchar(20) DEFAULT NULL,
  `emergency_contact` varchar(200) DEFAULT NULL,
  `license_due` date DEFAULT NULL,
  `note` varchar(4000) DEFAULT NULL,
  `korisnicki_nalog_id` int(10) UNSIGNED NOT NULL,
  `status` int(11) DEFAULT NULL,
  `pomocna` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
ALTER TABLE `chef`
  ADD PRIMARY KEY (`id`),
  ADD KEY `korisnicki_nalog_id` (`korisnicki_nalog_id`);
ALTER TABLE `chef`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
ALTER TABLE `chef`
  ADD CONSTRAINT `chef_ibfk_1` FOREIGN KEY (`korisnicki_nalog_id`) REFERENCES `korisnicki_nalog` (`id`);

CREATE TABLE `korisnicki_nalog` (
  `id` int(10) UNSIGNED NOT NULL,
  `korisnicko_ime` varchar(50) NOT NULL,
  `lozinka` varchar(50) NOT NULL,
  `datum_otvaranja_naloga` datetime DEFAULT NULL,
  `broj_logovanja` int(11) DEFAULT 0,
  `datum_poslednjeg_logovanja` datetime DEFAULT NULL,
  `sif_uloga_id` int(10) UNSIGNED NOT NULL,
  `pomocna` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
ALTER TABLE `korisnicki_nalog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sif_uloga_id` (`sif_uloga_id`);
ALTER TABLE `korisnicki_nalog`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
ALTER TABLE `korisnicki_nalog`
  ADD CONSTRAINT `korisnicki_nalog_ibfk_1` FOREIGN KEY (`sif_uloga_id`) REFERENCES `sif_uloga` (`id`);

CREATE TABLE `sif_uloga` (
  `id` int(10) UNSIGNED NOT NULL,
  `naziv` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
ALTER TABLE `sif_uloga`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `sif_uloga`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
  
ALTER TABLE `chef_location`
  ADD CONSTRAINT `chef_location_ibfk_1` FOREIGN KEY (`chef_id`) REFERENCES `chef` (`id`),
  ADD CONSTRAINT `chef_location_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`);
ALTER TABLE `location`
  ADD CONSTRAINT `location_ibfk_1` FOREIGN KEY (`sif_price_group_id`) REFERENCES `sif_price_group` (`id`);