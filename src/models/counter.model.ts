import  { Schema, model, models } from 'mongoose';

const CounterSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        count: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Counter = models.Counter || model('Counter', CounterSchema);
export default Counter;
