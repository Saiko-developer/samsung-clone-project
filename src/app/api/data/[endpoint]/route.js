import { NextResponse } from "next/server";
import localData from "../../../../../data.json"; // Make sure this path points to your data.json file

export async function GET(request, { params }) {
  // Await the params in newer Next.js versions
  const { endpoint } = await params; 
  
  // Look up the requested key inside your JSON object (e.g., localData["SmartphoneGuide"])
  const requestedData = localData[endpoint];

  if (!requestedData) {
    return NextResponse.json({ error: `Endpoint '${endpoint}' not found` }, { status: 404 });
  }

  return NextResponse.json(requestedData);
}
