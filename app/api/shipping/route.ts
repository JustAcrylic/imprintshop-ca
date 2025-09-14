// /app/api/shipping/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { weight, dimensions, destination } = await request.json();
  const UPS_API_KEY = process.env.UPS_API_KEY;

  // This is a simplified structure. Refer to the UPS API documentation
  // for the exact request body structure for their Rating API.
  const upsRequestBody = {
    RateRequest: {
      Shipment: {
        Shipper: {
          Address: {
            PostalCode: 'L1H 8L9', // Your origin postal code in Oshawa, ON
            CountryCode: 'CA',
          },
        },
        ShipTo: {
          Address: {
            PostalCode: destination.postalCode,
            CountryCode: 'CA',
          },
        },
        Package: {
          PackagingType: { Code: '02', Description: 'Package' },
          Dimensions: {
            UnitOfMeasurement: { Code: 'CM' },
            Length: dimensions.length.toString(),
            Width: dimensions.width.toString(),
            Height: dimensions.height.toString(),
          },
          PackageWeight: {
            UnitOfMeasurement: { Code: 'KGS' }, // Or LBS
            Weight: (weight / 1000).toString(), // Assuming weight is in grams
          },
        },
      },
    },
  };

  try {
    const response = await fetch('https://wwwcie.ups.com/json/Rate', { // Use production URL later
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'AccessLicenseNumber': UPS_API_KEY!,
      },
      body: JSON.stringify(upsRequestBody),
    });

    const data = await response.json();

    // Parse the complex UPS response to find the shipping cost
    const estimatedCost = data.RateResponse.RatedShipment.TotalCharges.MonetaryValue;

    return NextResponse.json({ cost: parseFloat(estimatedCost) });
  } catch (error) {
    console.error('UPS API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch shipping estimate' }, { status: 500 });
  }
}