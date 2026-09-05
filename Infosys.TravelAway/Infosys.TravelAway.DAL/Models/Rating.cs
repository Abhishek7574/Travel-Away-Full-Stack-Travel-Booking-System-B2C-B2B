using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Infosys.TravelAway.DAL.Models;
#nullable enable
public partial class Rating
{
    [JsonIgnore]
    public int RatingId { get; set; }

    public string? Comments { get; set; }

    public int? Rating1 { get; set; }

    public int? BookingId { get; set; }

    [JsonIgnore]
    public virtual BookPackage? Booking { get; set; }
}
