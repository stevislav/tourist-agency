import Offer from "../models/Offer.js";

export const createOffer = async (req, res, next) => {
  const newOffer = new Offer(req.body);
  try {
    const savedOffer = await newOffer.save();
    res.status(200).json(savedOffer);
  } catch (err) {
    next(err);
  }
};

export const updateOffer = async (req, res, next) => {
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOffer);
  } catch (err) {
    next(err);
  }
};

export const deleteOffer = async (req, res, next) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    res.status(200).json("Offer successfully deleted.");
  } catch (err) {
    next(err);
  }
};

export const getOffer = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.params.id);
    res.status(200).json(offer);
  } catch (err) {
    next(err);
  }
};

export const getOffers = async (req, res, next) => {
  //const {...others} = req.query;
  if (req.query.offerList == 1) {
    try {
      const offers = await Offer.find({});
      res.status(200).json(offers);
      //console.log(search1, search2, search3, startDate, endDate)
    } catch (err) {
      next(err);
    }
    return;
  }

  const { search1, search2, search3, startDate, endDate} = req.query;
  console.log(search1, search2, search3, startDate, endDate);

  let queryObject = {};
  if (search1 !== "") {

    queryObject["$or"] = [{ name: new RegExp('.*' + search1 + '.*', "i") }, { location: { $all: [new RegExp('.*' + search1 + '.*')] }}];
    //queryObject.name=search1
    //queryObject.location={ $all: [search1]}
  }
  if (search2 !== "") {
    queryObject["$and"] = [
      {
        $or: [{ continent: new RegExp('.*' + search2 + '.*', "i") }, { country: new RegExp('.*' + search2 + '.*', "i") }],
      },
    ];
    //queryObject.continent=search2
    //queryObject.country=search2
  }
  if (search3 !== "") {
    queryObject.transportType = new RegExp('.*' + search3 + '.*', "i");
  }

  //queryObject["startDate"]={ "$gte": new Date(startDate)}
  //queryObject["endDate"]={"$lt" : new Date(endDate)}

  if (startDate === endDate) {
    const startDateMS = new Date(startDate);
    queryObject.startDate = { $gt: startDateMS.getTime() };
    // queryObject.range={
    //     "$gte": startDateMS.getTime()
    // }
  } else {
    const startDateMS = new Date(startDate);
    const endDateMS = new Date(endDate);

    queryObject.startDate = { $gt: startDateMS.getTime() };
    queryObject.endDate = { $lt: endDateMS.getTime() };
  }
  const pageNum = req.query.page - 1;
  const pageLimit = req.query.limit;
  const queryLimit = req.query.limit;

  console.log(queryObject);

  try {
    const offers = await Offer.find(queryObject)
      .sort({ startDate: 1 })
      .skip(pageNum * pageLimit)
      .limit(queryLimit);
    res.status(200).json(offers);
    console.log(offers.length);
    //console.log(search1, search2, search3, startDate, endDate)
  } catch (err) {
    next(err);
  }
};

export const countByContinent = async (req,res,next) => {
  const continents = req.query.continents.split(",")

  try{
      const list = await Promise.all(continents.map(continent =>{
          return Offer.countDocuments({continent:continent})
      }))
      res.status(200).json(list)
  }catch(err){
      next(err)
  }
}


export const countByCountry = async (req,res,next) => {
  try{
      const country1 = await Offer.countDocuments({country:"Canada"})
      const country2 = await Offer.countDocuments({country:"Japan"})
      const country3 = await Offer.countDocuments({country:"Spain"})
      const country4 = await Offer.countDocuments({country:"China"})
      const country5 = await Offer.countDocuments({country:"Turkey"})
      const country6 = await Offer.countDocuments({country:"France"})

      res.status(200).json([
          {country:"Canada", count: country1},
          {country:"Japan", count: country2},
          {country:"Spain", count: country3},
          {country:"China", count: country4},
          {country:"Turkey", count: country5},
          {country:"France", count: country6},
      ]);
  }catch(err){
      next(err)
  }
}

export const getSample = async (req,res,next) => {
  try{
    const offers = await Offer.aggregate([{$sample: { size: 4 }}])
    res.status(200).json(offers)
  }catch(err){
    next(err)
  }
}