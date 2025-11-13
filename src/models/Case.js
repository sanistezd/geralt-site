import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
    caseNumber: {
        type: String,
        required: [true, 'Номер справи обовʼязковий'],
        unique: true,
        uppercase: true,
        match: [/^ГЕРАЛЬТ-\d{4}-\d{3}$/, 'Формат: ГЕРАЛЬТ-РРРР-XXX']
    },
    title: {
        type: String,
        required: [true, 'Назва справи обовʼязкова'],
        trim: true,
        maxlength: [200, 'Максимум 200 символів']
    },
    description: {
        type: String,
        required: [true, 'Опис справи обовʼязковий'],
        trim: true
    },
    article: {
        type: String,
        required: [true, 'Стаття обовʼязкова'],
        trim: true
    },
    verdict: {
        type: String,
        required: [true, 'Вердикт обовʼязковий'],
        trim: true
    },
    instagramUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\/(www\.)?instagram\.com\/.+/, 'Некоректне посилання Instagram']
    },
    imageUrl: {
        type: String,
        required: true,
        default: '/images/default-case.jpg'
    },
    tags: [{
        type: String,
        enum: ['цивільне', 'кримінальне', 'конституційне', 'сімейне', 'адміністративне', 'харчування', 'відпочинок']
    }],
    status: {
        type: String,
        enum: ['розглядається', 'закрита', 'виграна', 'програна'],
        default: 'розглядається'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    views: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    complexity: {
        type: String,
        enum: ['проста', 'середня', 'складна'],
        default: 'середня'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Віртуальні поля
caseSchema.virtual('durationDays').get(function() {
    return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

caseSchema.virtual('formattedDate').get(function() {
    return this.createdAt.toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

// Індекси для швидкого пошуку
caseSchema.index({ caseNumber: 1 });
caseSchema.index({ status: 1, priority: -1 });
caseSchema.index({ tags: 1 });
caseSchema.index({ createdAt: -1 });
caseSchema.index({ isFeatured: -1, createdAt: -1 });

// Middleware
caseSchema.pre('save', function(next) {
    // Автоматично генеруємо номер справи
    if (!this.caseNumber) {
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        this.caseNumber = `ГЕРАЛЬТ-${year}-${random}`;
    }
    next();
});

caseSchema.post('save', function(doc) {
    console.log(`📁 Справа ${doc.caseNumber} збережена`);
});

// Статичні методи
caseSchema.statics.getStats = function() {
    return this.aggregate([
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 },
                totalViews: { $sum: '$views' }
            }
        }
    ]);
};

export default mongoose.model('Case', caseSchema);