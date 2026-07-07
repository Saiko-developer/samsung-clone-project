import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const orderData = await request.json();
    const filePath = path.join(process.cwd(), "order.json");
    
    let existingOrders = [];
    try {
      const existing = fs.readFileSync(filePath, "utf-8");
      if (existing.trim()) {
        existingOrders = JSON.parse(existing);
        if (!Array.isArray(existingOrders)) existingOrders = [];
      }
    } catch {
      existingOrders = [];
    }
    
    existingOrders.push(orderData);
    fs.writeFileSync(filePath, JSON.stringify(existingOrders, null, 2), "utf-8");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}