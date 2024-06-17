const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    // validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // create entry  in db
    const CategoryDetials = await Category.create({
      name: name,
      description: description,
    });

    console.log(CategoryDetials);

    return res.status(200).json({
      success: true,
      CategoryDetials,
      message: "Category Created SuccessFully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// get all Category -> handler

exports.showAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find(
      {},
      { name: true, description: true,course:true }
    ).populate("course").exec()
    return res.status(200).json({
      success: true,
      allCategory,
      message: "All Category return SuccessFully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    // get courses for the specified category
    if(!categoryId){
       return res.status(404).json({
        success:false,
        message:"Category not found",
       })

    }
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path:"course",
        match:{status:"Published"},
        populate:{
         path:"ratingAndReviews", 
        }
      }).populate({
        path:"course",
        populate:{
          path:"instructor",
          populate:{
            path:"courses",
            populate:{
              path:"courseContent",
              populate:{
                path:"subSection"
              }
            }
          }
        }
      }).populate({
        path:"course",
        populate:{
          path:"courseContent",
          populate:{
            path:"subSection"
          }
        },
      }).exec()
    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    // handel the course  when there is no courses
    if (selectedCategory.course.length === 0) {
      console.log("NO courses found for  path selected category");
      return res.status(404).json({
        success: false,
        message: "course not found for the selected category",
      });
    }
    const selectedCourse = selectedCategory.course;

    const categoriesExpectSelected = await Category.find({
      _id: { $ne: categoryId },
    })
    .populate({
      path:"course",
      match:{status:"Published"},
      populate:{
       path:"ratingAndReviews", 
      }
    }).populate({
      path:"course",
      populate:{
        path:"instructor",
        populate:{
          path:"courses",
          populate:{
            path:"courseContent",
            populate:{
              path:"subSection"
            }
          }
        }
      }
    }).populate({
      path:"course",
      populate:{
        path:"courseContent",
        populate:{
          path:"subSection"
        }
      },
    }).exec()

    let diffrentCourses = [];
    for (const category of categoriesExpectSelected) {
      diffrentCourses.push(...category.course);
    }
    // get top-selling courses across all cattegories
    const allCategories = await Category.find().populate({
      path:"course",
      match:{status:"Published"},
      populate:{
       path:"ratingAndReviews", 
      }
    }).populate({
      path:"course",
      populate:{
        path:"instructor",
        populate:{
          path:"courses",
          populate:{
            path:"courseContent",
            populate:{
              path:"subSection"
            }
          }
        }
      }
    }).populate({
      path:"course",
      populate:{
        path:"courseContent",
        populate:{
          path:"subSection"
        }
      },
    }).exec()
    const allCourse = allCategories.flatMap((category) => category.course);
    const mostSellingCourses = allCourse
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);
    return res.status(200).json({
     success:true,
       data:
        {
          selectedCourse:selectedCourse,
          diffrentCourses:diffrentCourses,
          mostSellingCourses:mostSellingCourses,
        }

    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: err.message,
    });
  }
};
