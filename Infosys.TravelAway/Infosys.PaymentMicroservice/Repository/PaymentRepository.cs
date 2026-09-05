using Infosys.PaymentMicroservice.Models;

namespace Infosys.PaymentMicroservice.Repository
{
    public class PaymentRepository
    {
        private readonly PaymentDBContext paymentdbContext;

        public PaymentRepository(PaymentDBContext context)
        {
            paymentdbContext = context;
        }

        public bool AddPayment(Payment payment)
        {
            bool status;

            try
            {
                paymentdbContext.Payments.Add(payment);
                paymentdbContext.SaveChanges();
                status = true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                status = false;
            }

            return status;
        }
    }
}