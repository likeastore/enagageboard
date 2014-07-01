var config = {
	connection: process.env.MONGO_CONNECTION,

	logentries: {
		token: null
	},

	users: {
		'alexanderbeletsky': '$2a$12$8OWQYmioFTci9/kGppVujeEmFkOVCumMRVkYKg42fopiE9nYuD4uW',
		'voronianski': '$2a$12$5JkTzjpF8HcJNUrHrT.OiOqs80lXcaABNUKRTY51N.EJh240vsuJe',
		'jonasbarenfeld': '$2a$12$Bo1aUwhWMvTcGjds5hr.kO6AeVBWYJuRvhEe7YwPzaQAzyklL5CPu',
		'likeastore': '$2a$12$gS6K/5dt8ECKnB93BoVnse7qXTeljAH7dSlLZZrO7TPdLEYZwjnrG'
	}

};

module.exports = config;
