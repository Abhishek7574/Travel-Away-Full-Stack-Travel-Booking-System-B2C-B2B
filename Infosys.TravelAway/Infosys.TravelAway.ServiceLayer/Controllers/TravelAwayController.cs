using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Infosys.TravelAway.DAL;
using Infosys.TravelAway.DAL.Models;
namespace Infosys.TravelAway.ServiceLayer.Controllers
#nullable enable
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TravelAwayController : Controller
    {
       private readonly TravelAwayRepository repository;
        public TravelAwayController(TravelAwayRepository repository)
        {
            this.repository = repository;
        }

        [HttpPost]
        public int AddBooking(BookPackage package)
        {
            int status = -1;
            try
            {
                status = repository.BookPackageBySP(package);
            }
            catch (Exception)
            {

                status = -1;
            }
            return status;
        }

        [HttpGet]
        public JsonResult viewBookedPackage(string emailId)
        {
            List<BookPackage> result ;
            try
            {
                result = repository.viewBookedPackage(emailId);
            }
            catch (Exception)
            {

                result = new List<BookPackage>();
            }
            return Json(result);
        }

        [HttpPost]
        public int ValidateLoginCustomer(Customer cust)
        {
            int role;
            string emailId = cust.EmailId;
            string password = cust.UserPassword;
            try
            {
                role = repository.ValidateLoginCustomer(emailId, password);
            }
            catch (Exception)
            {
                role = -99;
            }
            return role;
        }
        [HttpPost]
        public bool AddRating(Rating rating) {
            bool status = false;
            try
            {
                status = repository.AddRating(rating);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }
            return status;
        }
      
        // API to get a list of all packages
        [HttpGet]
        public JsonResult GetPackages()
        {
            List<Package>? packageList;
            try
            {
                packageList = repository.GetPackages();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                packageList = null;
            }
            return Json(packageList);
        }

       

        // API to get a list of all package categories
        [HttpGet]
        public JsonResult GetPackageCategories()
        {
            List<PackageCategory>? packageCategoriesList;
            try
            {
                packageCategoriesList = repository.GetPackageCategories();
            }
            catch (Exception)
            {
                packageCategoriesList = null;
            }
            return Json(packageCategoriesList);
        }

        // API to get a list of package filtered by categoryId
        [HttpGet]
        public JsonResult GetPackagesByCategoryId(int categoryId)
        {
            List<Package>? packageList;
            try
            {
                packageList = repository.GetPackageByCategoryId(categoryId);
            }
            catch (Exception)
            {
                packageList = null;
            }
            return Json(packageList);
        }

        [HttpPost]
        public JsonResult RegisterCustomer(Customer custObj)
        {
            bool status = false;
            try
            {
                status = repository.RegisterCustomer(custObj);
            }
            catch (Exception)
            {
                status = false;
            }
            return Json(status);
        }
       

       
        // API to get a list of all package categories
       

        // API to get a list of package filtered by categoryId
       //checking how to push

      

        [HttpGet]
        public JsonResult GetPackageDetailsByPackageId(string packageId)
        {
            List<PackageDetail>? packageDetails;
            try
            {
                int Id = Convert.ToInt32(packageId);
                packageDetails = repository.GetPackageDetailsByPackageId(Id);
            }
            catch (Exception)
            {
                packageDetails = null;
            }
            return Json(packageDetails);
        }
        [HttpPut]
        public bool UpdateProfile(Customer custObj)
        {
            bool status;
            try
            {
                status = repository.EditProfile(custObj);
            }
            catch (Exception)
            {
                status = false;
            }
            return status;
        }



        // API to get details of user given emailId
        [HttpGet]
        public JsonResult GetCustomerByEmail(string emailId)
        {
            Customer? cust;
            try
            {
                cust = repository.GetCustomerByEmail(emailId);
            }
            catch (Exception)
            {
                cust = null;
            }
            return Json(cust);
        }
    }
}
