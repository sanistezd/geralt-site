import Case from '../models/Case.js';
import APIFeatures from '../utils/apiFeatures.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const getAllCases = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Case.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const cases = await features.query;
    const total = await Case.countDocuments(features.filterQuery);

    res.status(200).json({
        status: 'success',
        results: cases.length,
        total,
        data: { cases }
    });
});

export const getCase = catchAsync(async (req, res, next) => {
    const caseItem = await Case.findByIdAndUpdate(
        req.params.id,
        { $inc: { views: 1 } },
        { new: true, runValidators: true }
    );

    if (!caseItem) {
        return next(new AppError('Справу не знайдено', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { case: caseItem }
    });
});

export const createCase = catchAsync(async (req, res, next) => {
    const newCase = await Case.create(req.body);

    res.status(201).json({
        status: 'success',
        data: { case: newCase }
    });
});

export const getCaseStats = catchAsync(async (req, res, next) => {
    const stats = await Case.aggregate([
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 },
                avgViews: { $avg: '$views' }
            }
        },
        {
            $sort: { count: -1 }
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: { stats }
    });
});

export const getFeaturedCases = catchAsync(async (req, res, next) => {
    const featuredCases = await Case.find({ isFeatured: true })
        .sort({ createdAt: -1 })
        .limit(6);

    res.status(200).json({
        status: 'success',
        results: featuredCases.length,
        data: { cases: featuredCases }
    });
});