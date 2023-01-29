import PendingOffer from "../models/PendingOffer.js"

export const createPendingOffer = async (req,res,next) => {
    const newPendingOffer = new PendingOffer(req.body)
    try{
        const savedPendingOffer = await newPendingOffer.save()
        res.status(200).json(savedPendingOffer)
    }catch(err){
        next(err)
    }
}

export const updatePendingOffer = async (req,res,next) => {

    try{
        const updatedPendingOffer = await PendingOffer.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
        res.status(200).json(updatedPendingOffer)
    }catch(err){
        next(err)
    }
}

export const deletePendingOffer = async (req,res,next) => {

    try{
        await PendingOffer.findByIdAndDelete(req.params.id);
        res.status(200).json("Pending Offer successfully deleted.");
    }catch(err){
        next(err)
    }
}

export const getPendingOffer = async (req,res,next) => {

    try{
        const pendingOffer = await PendingOffer.findById(req.params.id);
        res.status(200).json(pendingOffer)
    }catch(err){
        next(err)
    }
}

export const getPendingOffers = async (req,res,next) => {
    const {...others} = req.query;

    try{
        const pendingOffers = await PendingOffer.find({...others}).limit(req.query.limit);
        res.status(200).json(pendingOffers)
    }catch(err){
        next(err)
    }
}
