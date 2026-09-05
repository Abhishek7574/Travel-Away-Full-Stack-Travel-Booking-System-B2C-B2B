using Infosys.PaymentMicroservice.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Infosys.PaymentMicroservice.Models;

namespace Infosys.PaymentMicroservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentMicroservicesController : Controller
    {
         private readonly PaymentRepository repository;

        public PaymentMicroservicesController(PaymentRepository _repository)
        {
            this.repository = _repository;
        }

        [HttpPost]
        public JsonResult AddNewPayment(Payment payment)
        {
            bool status;
            string message;

            try
            {
                status = repository.AddPayment(payment);

                if (status)
                {
                    message = "Payment Added Successfully";
                }
                else
                {
                    message = "Payment didn't Added";
                }
            }
            catch (Exception)
            {
                message = "Something errors occurred";
            }

            return Json(message);
        }
    }
}