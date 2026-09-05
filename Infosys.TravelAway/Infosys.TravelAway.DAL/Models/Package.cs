using System;
using System.Collections.Generic;

namespace Infosys.TravelAway.DAL.Models;
#nullable enable
public partial class Package
{
    public int PackageId { get; set; }

    public string PackageName { get; set; } = null!;

    public int? PackageCategoryId { get; set; }

    public string? TypeOfPackage { get; set; }

    public virtual PackageCategory? PackageCategory { get; set; }

    public virtual ICollection<PackageDetail> PackageDetails { get; set; } = new List<PackageDetail>();
}
