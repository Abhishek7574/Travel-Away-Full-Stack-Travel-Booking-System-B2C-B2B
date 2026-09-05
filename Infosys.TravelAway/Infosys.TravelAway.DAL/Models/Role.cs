using System;
using System.Collections.Generic;

namespace Infosys.TravelAway.DAL.Models;
#nullable enable
public partial class Role
{
    public byte RoleId { get; set; }

    public string? RoleName { get; set; }

    public virtual ICollection<Customer> Customers { get; set; } = new List<Customer>();

    
}
