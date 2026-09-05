using Infosys.TravelAway.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


namespace Infosys.TravelAway.DAL
{
    public class TravelAwayRepository
    {
        public TravelAwayDbContext Context { get; set; }


        public TravelAwayRepository()
        {
            Context = new TravelAwayDbContext();
        }


        //edit profile
        public bool EditProfile(Customer cust)
        {
            bool status = false;
            Customer cust1=Context.Customers.Find(cust.EmailId);
            try
            {
                if(cust1!=null)
                {
                    cust1.FirstName = cust.FirstName;
                    cust1.LastName = cust.LastName;
                    cust1.ContactNumber = cust.ContactNumber;
                    cust1.Address = cust.Address;
                    cust1.Gender = cust.Gender;
                    cust1.DateOfBirth = cust.DateOfBirth;
                    Context.SaveChanges();
                    status = true;

                                
                }
                else
                {
                    status = false;
                }
            }
            catch (Exception ex)
            {
                status = false;
                Console.WriteLine(ex.Message);
            }
            return status;
        }

       
        public Customer GetCustomerByEmail(string email)
        {
            Customer cust;
            try
            {

                cust = (from usr in Context.Customers
                        where usr.EmailId == email
                        select usr).FirstOrDefault();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                cust = null;
            }
            return cust;
        }

        //Book Package
        public bool AddBookPackage(BookPackage obj)
        {
            bool result = false;
            try
            {
                Context.BookPackages.Add(obj);
                Context.SaveChanges();
                result = true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                result = false;
            }
            return result;
        }

        // Insert bookPackage object using stored procedure
        public int BookPackageBySP(BookPackage bookpkg)
        {

            int bookingId = 0;
            int result = -1;
            try
            {
                SqlParameter prmEmailId = new SqlParameter("@EmailId", bookpkg.EmailId);
                SqlParameter prmContactNumber = new SqlParameter("@ContactNumber", bookpkg.ContactNumber);
                SqlParameter prmAddress = new SqlParameter("@Address", bookpkg.Address);
                SqlParameter prmDateOfTravel = new SqlParameter("@DateOfTravel", bookpkg.DateOfTravel);
                SqlParameter prmNumberOfAdults = new SqlParameter("@NumberOfAdults", bookpkg.NumberOfAdults);
                SqlParameter prmNumberOfChildren = new SqlParameter("@NumberOfChildren", bookpkg.NumberOfChildren);
                SqlParameter prmStatus = new SqlParameter("@Status", bookpkg.Status);
                SqlParameter prmPackageId = new SqlParameter("@PackageId", bookpkg.PackageId);

                SqlParameter prmBookingId = new SqlParameter("@BookingId", System.Data.SqlDbType.BigInt);
                prmBookingId.Direction = System.Data.ParameterDirection.Output;

                SqlParameter prmReturnResult = new SqlParameter("@ReturnResult", System.Data.SqlDbType.Int);
                prmReturnResult.Direction = System.Data.ParameterDirection.Output;

                result = Context.Database.ExecuteSqlRaw("EXEC @ReturnResult= usp_BookPackage @EmailId,@ContactNumber,@Address,@DateOfTravel," +
                    "@NumberOfAdults,@NumberOfChildren,@Status,@PackageId,@BookingId OUT", prmReturnResult, prmEmailId, prmContactNumber,
                  prmAddress, prmDateOfTravel, prmNumberOfAdults, prmNumberOfChildren, prmStatus, prmPackageId, prmBookingId);

                if (result > 0)
                {
                    bookingId = Convert.ToInt32(prmBookingId.Value);

                }
                else
                {
                    bookingId = 0;

                }
            }
            catch (Exception ex)
            {
                bookingId = 0;
                Console.WriteLine(ex.Message);

            }
            return bookingId;

        }

        //Add Rating
        public bool AddRating(Rating rating)
        {
            bool result = false;
            try
            {
                Context.Ratings.Add(rating);
                Context.SaveChanges();
                result = true;
            } catch (Exception ex) {
                Console.WriteLine(ex.Message);
                result = false;
            }
            return result;
        }

        public int ValidateLoginCustomer(string emailId, string password)
        {
            int result = 0;
            try
            {
                result = Context.Customers.Select(s => TravelAwayDbContext.fn_ValidateAllLogins(emailId, password)).FirstOrDefault();
            }
            catch (Exception)
            {
                result = -99;
            }
            return result;
        }

        public List<Package> GetPackages()
        {
            List<Package> package;
            try
            {
                package = Context.Packages.FromSqlRaw("SELECT * FROM dbo.ufn_ViewAllPackages()").ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                package = null;
            }
            return package;
        }


        public List<Package> GetPackageByCategoryId(int categoryId)
        {
            List<Package> obj = null;
            try
            {
                obj = (from a in Context.Packages where a.PackageCategoryId == categoryId select a).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                obj = null;
            }
            return obj;
        }

        public List<PackageDetail> GetPackageDetailsByPackageId(int packageId)
        {
            List<PackageDetail> obj = null;
            try
            {
                obj = (from a in Context.PackageDetails where a.PackageId == packageId select a).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                obj = null;
            }
            return obj;
        }
        public List<PackageCategory> GetPackageCategories()
        {
            
                List<PackageCategory> obj = null;
                try
                {
                    obj = (from a in Context.PackageCategories select a).ToList();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    obj = null;
                }
                return obj;
            

        }



        public bool RegisterCustomer(Customer obj)
        {
            bool result = false;
            try
            {
                Console.WriteLine(obj);
                Context.Customers.Add(obj);
                Context.SaveChanges();
                result = true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                result = false;
            }
            return result;
        }
        public List<BookPackage> viewBookedPackage(string emailId)
        {
            List<BookPackage> result = null;
            try
            {
                result= Context.BookPackages.Where(temp=>temp.EmailId == emailId).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }
            return result;
        }
    }
}
       
       
