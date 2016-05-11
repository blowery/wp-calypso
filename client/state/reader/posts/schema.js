export const postSchema = {
	type: 'object',
	patternProperties: {
		//be careful to escape regexes properly
		'^\\s+$': {
			type: 'object',
			required: [ 'pseudo_ID' ],
			properties: {
				ID: { type: 'integer' },
				feed_ID: { type: 'integer' },
				feed_item_ID: { type: 'integer' },

				title: { type: 'string' },
				slug: { type: 'string' },
				description: { type: 'string' },
				owner: { type: 'string' },
				is_owner: { type: 'boolean' },
				is_public: { type: 'boolean' },
			}
		}
	},
	additionalProperties: false
};
