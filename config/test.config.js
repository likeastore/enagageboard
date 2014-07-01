var config = {
	session: {
		key: 'a119eb053f4b40b6e744bf7f7e277229b2a932a7'
	},

	logentries: {
		token: null
	},

	users: {
		'alexanderbeletsky': '$2a$12$8OWQYmioFTci9/kGppVujeEmFkOVCumMRVkYKg42fopiE9nYuD4uW',
		'voronianski': '$2a$12$5JkTzjpF8HcJNUrHrT.OiOqs80lXcaABNUKRTY51N.EJh240vsuJe',
		'jonasbarenfeld': '$2a$12$Bo1aUwhWMvTcGjds5hr.kO6AeVBWYJuRvhEe7YwPzaQAzyklL5CPu',
		'likeastore': '$2a$12$gS6K/5dt8ECKnB93BoVnse7qXTeljAH7dSlLZZrO7TPdLEYZwjnrG'
	},

	seismo: {
		app: 'likeastore-production',
		options: {
			server: 'https://localhost:3005',
			credentials: {
				username: 'likeastore',
				password: 'mypass'
			}
		}
	}
};

module.exports = config;
