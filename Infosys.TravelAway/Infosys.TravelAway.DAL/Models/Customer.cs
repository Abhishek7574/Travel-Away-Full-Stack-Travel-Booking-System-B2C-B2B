using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
#nullable enable
namespace Infosys.TravelAway.DAL.Models;

public partial class Customer
{
    public string EmailId { get; set; } = null!;

    public byte? RoleId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string UserPassword { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public decimal ContactNumber { get; set; }

    public DateOnly DateOfBirth { get; set; }

    public string Address { get; set; } = null!;
    [JsonIgnore]

    public virtual ICollection<BookPackage> BookPackages { get; set; } = new List<BookPackage>();
    [JsonIgnore]

    public virtual Role? Role { get; set; }
}
