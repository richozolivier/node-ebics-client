#! /usr/bin/env node

'use strict';

const client = require('./getClient')();
const { Orders } = require('../index');

// The bank keys must have been already saved
client.send(Orders.Z53(null, null)) // startDate 'YYYY-MM-DD', endDate 'YYYY-MM-DD'
	.then((resp) => {
		console.log('Response for Z53 order %j', resp);
		if (resp.technicalCode !== '000000')
			throw new Error('Something went wrong');

		// Parsing and processing the CAMT053 file should happen somewhere here, ideally after saving it to disk
		const data = Buffer.from(resp.orderData);
		console.log(data.toString('utf8'));
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
