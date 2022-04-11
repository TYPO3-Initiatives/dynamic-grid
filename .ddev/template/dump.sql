UPDATE `pages`
  SET TSconfig =
				'mod.web_layout.BackendLayouts {\r\n  dynamic {\r\n    title = Example\r\n    config {\r\n      backend_layout {\r\n        colCount = 1\r\n        rowCount = 1\r\n        rows {\r\n          1 {\r\n            columns {\r\n              1 {\r\n                name = dynamic grid\r\n                colPos = 0\r\n                dynamicGrid = 1\r\n              }\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}',
			backend_layout =
				'pagets__dynamic',
			tx_dynamicgrid_grid =
				'[\r\n  {\r\n    \"colPos\":\"0\",\r\n    \"containers\": [\r\n      {\r\n        \"items\": [\r\n          {\r\n            \"size\": 1,\r\n            \"entities\": [\r\n              {\"name\":  \"tt_content\", \"identifier\": \"1\"}\r\n            ]\r\n          }\r\n        ]\r\n      },\r\n      {\r\n        \"items\": [\r\n          {\r\n            \"size\": 1,\r\n            \"entities\": [\r\n              {\"name\":  \"tt_content\", \"identifier\": \"2\"},\r\n              {\"name\":  \"tt_content\", \"identifier\": \"3\"}\r\n            ]\r\n          },\r\n          {\r\n            \"size\": 1,\r\n            \"entities\": [\r\n              {\"name\":  \"tt_content\", \"identifier\": \"4\"}\r\n            ]\r\n          }\r\n        ]\r\n      },\r\n      {\r\n        \"items\": [\r\n          {\r\n            \"size\": 1,\r\n            \"entities\": [\r\n              {\"name\":  \"tt_content\", \"identifier\": \"5\"}\r\n            ]\r\n          }\r\n        ]\r\n      }\r\n    ]\r\n  }\r\n]'
	WHERE
      uid = 1;


INSERT INTO `tt_content`
VALUES (1, '', 1, 1649341467, 1649341186, 1, 0, 0, 0, 0, '', 256, 0, 0, 0, 0, NULL, 0,
				'{\"CType\":\"\",\"colPos\":\"\",\"header\":\"\",\"header_layout\":\"\",\"header_position\":\"\",\"date\":\"\",\"header_link\":\"\",\"subheader\":\"\",\"bodytext\":\"\",\"layout\":\"\",\"frame_class\":\"\",\"space_before_class\":\"\",\"space_after_class\":\"\",\"sectionIndex\":\"\",\"linkToTop\":\"\",\"sys_language_uid\":\"\",\"hidden\":\"\",\"starttime\":\"\",\"endtime\":\"\",\"fe_group\":\"\",\"editlock\":\"\",\"categories\":\"\",\"rowDescription\":\"\"}',
				0, 0, 0, 0, 'text', 'Element 1', '',
				'<p>First element, should be the first element on page, in dynamic grid 100%.</p>', 0, 0, 0, 0, 0, 0, 0, 2, 0,
				0, 0, 'default', 0, '', '', NULL, NULL, 0, '', '', 0, '0', '', 1, 0, NULL, 0, '', '', '', 0, 0, 0, NULL, '', 0,
				'', '', '', NULL, 124, 0, 0, 0, 0, NULL, 0),
			 (2, '', 1, 1649342127, 1649341204, 1, 0, 0, 0, 0, '', 512, 0, 0, 0, 0, NULL, 0,
				'{\"CType\":\"\",\"colPos\":\"\",\"header\":\"\",\"header_layout\":\"\",\"header_position\":\"\",\"date\":\"\",\"header_link\":\"\",\"subheader\":\"\",\"layout\":\"\",\"frame_class\":\"\",\"space_before_class\":\"\",\"space_after_class\":\"\",\"sectionIndex\":\"\",\"linkToTop\":\"\",\"sys_language_uid\":\"\",\"hidden\":\"\",\"starttime\":\"\",\"endtime\":\"\",\"fe_group\":\"\",\"editlock\":\"\",\"categories\":\"\",\"rowDescription\":\"\"}',
				0, 0, 0, 0, 'header', '2th Element', '', NULL, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 'default', 0, '', '', NULL,
				NULL, 0, '2nd row of 2 cols, 1st element left side', '', 0, '0', '', 1, 0, NULL, 0, '', '', '', 0, 0, 0, NULL,
				'', 0, '', '', '', NULL, 124, 0, 0, 0, 0, NULL, 0),
			 (3, '', 1, 1649342013, 1649341233, 1, 0, 0, 0, 0, '', 768, 0, 0, 0, 0, NULL, 0,
				'{\"CType\":\"\",\"colPos\":\"\",\"header\":\"\",\"header_layout\":\"\",\"header_position\":\"\",\"date\":\"\",\"header_link\":\"\",\"subheader\":\"\",\"bodytext\":\"\",\"layout\":\"\",\"frame_class\":\"\",\"space_before_class\":\"\",\"space_after_class\":\"\",\"sectionIndex\":\"\",\"linkToTop\":\"\",\"sys_language_uid\":\"\",\"hidden\":\"\",\"starttime\":\"\",\"endtime\":\"\",\"fe_group\":\"\",\"editlock\":\"\",\"categories\":\"\",\"rowDescription\":\"\"}',
				0, 0, 0, 0, 'text', 'Whats up?', '', '<p>Element 3, 3rd row, 1st element left side</p>', 0, 0, 0, 0, 0, 0, 0, 2,
				0, 0, 0, 'default', 0, '', '', NULL, NULL, 0, 'WhatsApp', '', 0, '0', '', 1, 0, NULL, 0, '', '', '', 0, 0, 0,
				NULL, '', 0, '', '', '', NULL, 124, 0, 0, 0, 0, NULL, 0),
			 (4, '', 1, 1649341931, 1649341280, 1, 0, 0, 0, 0, '', 1024, 0, 0, 0, 0, NULL, 0,
				'{\"CType\":\"\",\"colPos\":\"\",\"header\":\"\",\"header_layout\":\"\",\"header_position\":\"\",\"date\":\"\",\"header_link\":\"\",\"subheader\":\"\",\"bodytext\":\"\",\"layout\":\"\",\"frame_class\":\"\",\"space_before_class\":\"\",\"space_after_class\":\"\",\"sectionIndex\":\"\",\"linkToTop\":\"\",\"sys_language_uid\":\"\",\"hidden\":\"\",\"starttime\":\"\",\"endtime\":\"\",\"fe_group\":\"\",\"editlock\":\"\",\"categories\":\"\",\"rowDescription\":\"\"}',
				0, 0, 0, 0, 'text', 'Get a new Element ', '', '<p>Second row, element 2 of 2, right side</p>', 0, 0, 0, 0, 0, 0,
				0, 2, 0, 0, 0, 'default', 0, '', '', NULL, NULL, 0, '', '', 0, '0', '', 1, 0, NULL, 0, '', '', '', 0, 0, 0,
				NULL, '', 0, '', '', '', NULL, 124, 0, 0, 0, 0, NULL, 0),
			 (5, '', 1, 1649342050, 1649341310, 1, 0, 0, 0, 0, '', 1280, 0, 0, 0, 0, NULL, 0,
				'{\"CType\":\"\",\"colPos\":\"\",\"header\":\"\",\"header_layout\":\"\",\"header_position\":\"\",\"date\":\"\",\"header_link\":\"\",\"subheader\":\"\",\"layout\":\"\",\"frame_class\":\"\",\"space_before_class\":\"\",\"space_after_class\":\"\",\"sectionIndex\":\"\",\"linkToTop\":\"\",\"sys_language_uid\":\"\",\"hidden\":\"\",\"starttime\":\"\",\"endtime\":\"\",\"fe_group\":\"\",\"editlock\":\"\",\"categories\":\"\",\"rowDescription\":\"\"}',
				0, 0, 0, 0, 'header', '5th element of the world', '', NULL, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 'default', 0, '',
				'', NULL, NULL, 0, 'We need final 5 elements here... 4th row, 1 element 100%', '', 0, '0', '', 1, 0, NULL, 0,
				'', '', '', 0, 0, 0, NULL, '', 0, '', '', '', NULL, 124, 0, 0, 0, 0, NULL, 0);
