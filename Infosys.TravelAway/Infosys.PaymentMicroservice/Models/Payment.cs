

using System.ComponentModel.DataAnnotations;
#nullable enable
namespace Infosys.PaymentMicroservice.Models
{
    public class Payment
    {
        [Key]
        public int? PaymentId { get; set; }

        public int? BookingId { get; set; }

        public decimal? TotalAmount { get; set; }

        public string? PaymentStatus { get; set; }
    }
}