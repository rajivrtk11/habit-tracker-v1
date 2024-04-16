const Joi = require('joi');

const goalSchema = Joi.object({
    goalName: Joi.string().trim().min(6).required(),
    minTimeline: Joi.date().required(),
    maxTimeline: Joi.date().required()
        .min(Joi.ref('minTimeline'))
        .messages({
            'date.min': 'Max timeline must be greater than or equal to min timeline'
        })
});

module.exports = goalSchema;