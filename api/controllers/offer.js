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
  let queryObject2 = {};
  if (search1 !== "") {

    queryObject["$or"] = [{ name: new RegExp('.*' + search1 + '.*', "i") }, { location: { $all: [new RegExp('.*' + search1 + '.*')] }}];
    queryObject2["$or"] = [{ name: new RegExp('.*' + search1 + '.*', "i") }, { location: { $all: [new RegExp('.*' + search1 + '.*')] }}];

    //queryObject.name=search1
    //queryObject.location={ $all: [search1]}
  }
  if (search2 !== "") {
    queryObject["$and"] = [
      {
        $or: [{ continent: new RegExp('.*' + search2 + '.*', "i") }, { country: new RegExp('.*' + search2 + '.*', "i") }],
      },
    ];
    queryObject2["$and"] = [
      {
        $or: [{ continent: new RegExp('.*' + search2 + '.*', "i") }, { country: new RegExp('.*' + search2 + '.*', "i") }],
      },
    ];

    //queryObject.continent=search2
    //queryObject.country=search2
  }
  if (search3 !== "") {
    queryObject.transportType = new RegExp('.*' + search3 + '.*', "i");
    queryObject2.transportType = new RegExp('.*' + search3 + '.*', "i");

  }

  //queryObject["startDate"]={ "$gte": new Date(startDate)}
  //queryObject["endDate"]={"$lt" : new Date(endDate)}

  if (startDate === endDate) {
    const startDateMS = new Date(startDate);
    const startDateMS2 = new Date();
    queryObject.startDate = { $gt: startDateMS.getTime() };
    queryObject2.startDate = { $gt: startDateMS2.getTime() };

    // queryObject.range={
    //     "$gte": startDateMS.getTime()
    // }
  } else {
    const startDateMS = new Date(startDate);
    const endDateMS = new Date(endDate);
    const startDateMS2 = new Date();
    const endDateMS2 = new Date(endDate);

    queryObject.startDate = { $gt: startDateMS.getTime() };
    queryObject.endDate = { $lt: endDateMS.getTime() };
    queryObject2.startDate = { $gt: startDateMS2.getTime() };
    queryObject2.endDate = { $lt: endDateMS2.getTime() };

  }
  const pageNum = req.query.page - 1;
  const pageLimit = req.query.limit;
  const queryLimit = req.query.limit;

  //console.log(req.query)

  //console.log(queryObject);

  try {
    const offersLength = await Offer.countDocuments(queryObject)
    const offersLength2 = await Offer.countDocuments(queryObject2)

    const maxPageNum = Math.floor(offersLength2/pageLimit)
    let offers2 = await Offer.find(queryObject2)
      .sort({ startDate: 1 })
      .skip(Math.min(pageNum, maxPageNum) * pageLimit)
      .limit(queryLimit);

    console.log("offers2 before ", offers2.length)
    console.log(parseInt(pageNum*pageLimit)+parseInt(pageLimit))

    if(
      (offersLength>offersLength2)
       && 
       (
        ( parseInt(pageNum*pageLimit)+parseInt(pageLimit) )>offersLength2
       )
      ){
      const offers = await Offer.find(queryObject)
      .sort({ startDate: 1 })
      .limit(offersLength-offersLength2);
      //console.log(offers)
      offers2 = offers2.concat(offers)
      const editedPageNum = pageNum-Math.floor(offersLength2/pageLimit)
      console.log(pageNum,pageLimit,editedPageNum)

      if(offers2.length>pageLimit){
        const slicedOffers = offers2.slice(editedPageNum * pageLimit,editedPageNum * pageLimit+pageLimit)
        offers2 = slicedOffers
      }else{
        const slicedOffers = offers2.slice(editedPageNum * pageLimit)
        offers2 = slicedOffers

      }
      

    }
    
    console.log(offersLength, offersLength2)
    console.log("offers2 after ", offers2.length)


    //console.log(offers.length);
    //console.log(offers2.length);
    // const slicedOffers = offers.slice(0,offers.length-offers2.length)
    
    // let sortedOffers = offers2.concat(slicedOffers)
    // console.log(sortedOffers.length)
    // console.log(offersLength, offersLength2)
    // console.log(offersLength-offersLength2)

    // let slicedSortedOffers;
    // if(sortedOffers.length<(pageNum*pageLimit+pageLimit)){
    //   slicedSortedOffers = sortedOffers.slice(pageNum*pageLimit)
    // }else{
    //   slicedSortedOffers = sortedOffers.slice(pageNum*pageLimit,pageNum*pageLimit+pageLimit)
    // }

    //console.log(slicedSortedOffers.length)
      
    res.status(200).json(offers2);
    
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