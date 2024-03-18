const Tour =require("../models/Tour")
// creating a new tour 
exports.createTour=async(req,res)=>{
    const newTour=new Tour(req.body)
    try{
        const savedTour=await newTour.save()  
        res.status(201).json({
            status:"successfully created a new tour ",
            data:savedTour,
            success:true

        })

    }catch(error){
        res.status(400).json({
            success:false,
            message:"failed to create a new tour",
        })
    }
};
//  update tour 
 exports.updateTour= async(req,res)=>{
     const id =req.params.id
    try{
        const updateTour=await Tour.findByIdAndUpdate(id,{
            $set:req.body
            },{new:true})

         res.status(200).json({
            status:"successfully updated a tour ",
            data:updateTour,
            success:true
         })
        }

    catch(error){
        res.status(500).json({
            success:false,
            message:"failed to update a tour",
        })
    }
 };
 // delete tour 
 exports.deleteTour= async(req,res)=>{
     const id =req.params.id;
     try{
          const deletedTour=await Tour.findByIdAndDelete(id);
             res.status(200).json({
                 status:"successfully deleted a tour ",
                 success:true
             })
     }catch(error){
             res.status(500).json({
                 success:false,
                 message:"failed to delete a tour",
             })
     }
  }; 
 // getsinge tour 
 exports.getSingleTour= async(req,res)=>{
    try{
       const getSingleTour=await Tour.findById(req.params.id);
       res.status(200).json({
        status:"successfully fetched a single tour ",
        data:getSingleTour,
        success:true
       })
    }catch(error){
            res.status(404).json({
                success:false,
                message:"failed to fetch a single tour",
            })
    }
 };
// getAll tour 
exports.getAllTour= async(req,res)=>{
    const page=parseInt(req.query.page);
 

    try{
        const page = parseInt(req.query.page) || 1; // get the page number from the query parameters, default to 1
        const limit = 8; // set the number of items per page
        const skip = (page - 1) * limit; // calculate the number of documents to skip
        
        const getAllTour = await Tour.find().skip(skip).limit(limit);
      
        res.status(200).json({
            count:tours.length,
            status:"successfully fetched all tours ",
            data:getAllTour,
            success:true
        })  

    }catch(error){
        res.status(404).json({
            success:false,
            message:"failed to fetch all tours",
        })
    }
 };
 // Get tour by search
exports.getTourBySearch = async (req, res) => {

    const city = new RegExp(req.query.city, 'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)
 
    try {
       // gte means greater than equal j
       const tours = await Tour.find({ city, distance: { $gte: distance }, maxGroupSize: { $gte: maxGroupSize } }).populate('reviews')
 
       res.status(200).json({ success: true, message: 'Successfully', data: tours })
    } catch (error) {
       res.status(404).json({ success: false, message: 'Not Found' })
    }
 }
 