"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Filter, Download, Upload } from "lucide-react"

interface PricelistItem {
  id: string
  model: string
  description: string
  t2MspStockistPrice: number
  resellerPrice: number
  endCustomerPrice: number
  mrpPrice: number
  boxQuantity: number
  extendedWarranty: number
  category: string
  lastUpdated: string
  status: "active" | "inactive"
}

const telecomPricelistData: PricelistItem[] = [
  {
    id: "1",
    model: "HT801",
    description: "1 FXS, 1 FastEthernet",
    t2MspStockistPrice: 3220,
    resellerPrice: 3974,
    endCustomerPrice: 4372,
    mrpPrice: 7500,
    boxQuantity: 32,
    extendedWarranty: 362.5,
    category: "Analog Telephone Adapters",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    model: "HT801 v2 (NEW, GA mid-Oct)",
    description: "1 FXS, 1 FastEthernet",
    t2MspStockistPrice: 2875,
    resellerPrice: 3602,
    endCustomerPrice: 3962,
    mrpPrice: 6750,
    boxQuantity: 32,
    extendedWarranty: 290,
    category: "Analog Telephone Adapters",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "3",
    model: "HT802",
    description: "2 FXS, 1 FastEthernet",
    t2MspStockistPrice: 3565,
    resellerPrice: 4471,
    endCustomerPrice: 4918,
    mrpPrice: 8437,
    boxQuantity: 32,
    extendedWarranty: 362.5,
    category: "Analog Telephone Adapters",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "4",
    model: "HT802 v2 (NEW, GA mid-Oct)",
    description: "2 FXS, 2 GigE, NAT Router",
    t2MspStockistPrice: 3220,
    resellerPrice: 3974,
    endCustomerPrice: 4372,
    mrpPrice: 7500,
    boxQuantity: 32,
    extendedWarranty: 290,
    category: "Analog Telephone Adapters",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "5",
    model: "HT812",
    description: "2 FXS, 2 GigE, NAT Router",
    t2MspStockistPrice: 4140,
    resellerPrice: 5216,
    endCustomerPrice: 5738,
    mrpPrice: 9844,
    boxQuantity: 16,
    extendedWarranty: 362.5,
    category: "Analog Telephone Adapters",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "6",
    model: "HT812 v2 (NEW, GA 1H Sep)",
    description: "2 FXS, 2 GigE, NAT Router",
    t2MspStockistPrice: 3680,
    resellerPrice: 4595,
    endCustomerPrice: 5055,
    mrpPrice: 8672,
    boxQuantity: 16,
    extendedWarranty: 362.5,
    category: "Analog Telephone Adapters",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "7",
    model: "HT813",
    description: "1 FXS, 1 FXO, 2 GigE NAT Router",
    t2MspStockistPrice: 5520,
    resellerPrice: 6831,
    endCustomerPrice: 7514,
    mrpPrice: 12890,
    boxQuantity: 16,
    extendedWarranty: 725,
    category: "Analog Telephone Adapters",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "8",
    model: "HT814",
    description: "4 FXS, 2 GigE, NAT Router",
    t2MspStockistPrice: 7015,
    resellerPrice: 8819,
    endCustomerPrice: 9700,
    mrpPrice: 16640,
    boxQuantity: 16,
    extendedWarranty: 725,
    category: "Analog Telephone Adapters",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "9",
    model: "HT814 v2 (NEW, GA 1H Sep)",
    description: "4 FXS, 2 GigE NAT Router",
    t2MspStockistPrice: 6095,
    resellerPrice: 7700,
    endCustomerPrice: 8470,
    mrpPrice: 14531,
    boxQuantity: 16,
    extendedWarranty: 725,
    category: "Analog Telephone Adapters",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "10",
    model: "HT818",
    description: "8 FXS, 2 GigE NAT Router",
    t2MspStockistPrice: 11500,
    resellerPrice: 14531,
    endCustomerPrice: 15985,
    mrpPrice: 27421,
    boxQuantity: 18,
    extendedWarranty: 1015,
    category: "Analog Telephone Adapters",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "11",
    model: "HT818 v2 (NEW, GA 1H Sep)",
    description: "8 FXS, 2 GigE NAT Router",
    t2MspStockistPrice: 9430,
    resellerPrice: 11923,
    endCustomerPrice: 13115,
    mrpPrice: 22500,
    boxQuantity: 18,
    extendedWarranty: 1015,
    category: "Analog Telephone Adapters",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "12",
    model: "HT 841 (New, GA mid-Sep)",
    description: "4 FXO, 1 FXS, 2 GigE PoE NAT Router",
    t2MspStockistPrice: 9775,
    resellerPrice: 12172,
    endCustomerPrice: 13389,
    mrpPrice: 22968,
    boxQuantity: 12,
    extendedWarranty: 1015,
    category: "Analog Telephone Adapters",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "13",
    model: "HT 881 (New, GA mid-Sep)",
    description: "8 FXO, 1FXS, 2 GigE, PoE, Nat Router",
    t2MspStockistPrice: 14260,
    resellerPrice: 17885,
    endCustomerPrice: 19673,
    mrpPrice: 33749,
    boxQuantity: 12,
    extendedWarranty: 1450,
    category: "Analog Telephone Adapters",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "14",
    model: "GXW4216",
    description: "16 FXS, 1 GigE",
    t2MspStockistPrice: 24380,
    resellerPrice: 30677,
    endCustomerPrice: 33745,
    mrpPrice: 57889,
    boxQuantity: 2,
    extendedWarranty: 2900,
    category: "Gateways",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "15",
    model: "GXW4224",
    description: "24 FXS, 1 GigE",
    t2MspStockistPrice: 34730,
    resellerPrice: 43594,
    endCustomerPrice: 47954,
    mrpPrice: 82264,
    boxQuantity: 2,
    extendedWarranty: 4350,
    category: "Gateways",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "16",
    model: "GXW4232",
    description: "32 FXS, 1 GigE",
    t2MspStockistPrice: 40135,
    resellerPrice: 50301,
    endCustomerPrice: 55331,
    mrpPrice: 94920,
    boxQuantity: 2,
    extendedWarranty: 5800,
    category: "Gateways",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "17",
    model: "GXW4248",
    description: "48 FXS, 1 GigE",
    t2MspStockistPrice: 60375,
    resellerPrice: 75638,
    endCustomerPrice: 83202,
    mrpPrice: 142731,
    boxQuantity: 2,
    extendedWarranty: 7250,
    category: "Gateways",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "18",
    model: "GXW4216V2",
    description: "16 FXS, 1 GigE, GDMS Compatible",
    t2MspStockistPrice: 28290,
    resellerPrice: 35521,
    endCustomerPrice: 39073,
    mrpPrice: 67030,
    boxQuantity: 2,
    extendedWarranty: 2900,
    category: "Gateways",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "19",
    model: "GXW4224V2",
    description: "24 FXS, 1 GigE, GDMS Compatible",
    t2MspStockistPrice: 41170,
    resellerPrice: 51667,
    endCustomerPrice: 56834,
    mrpPrice: 97498,
    boxQuantity: 2,
    extendedWarranty: 4350,
    category: "Gateways",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "20",
    model: "GXW4232V2",
    description: "32 FXS, 1 GigE, GDMS Compatible",
    t2MspStockistPrice: 48990,
    resellerPrice: 61479,
    endCustomerPrice: 67627,
    mrpPrice: 116013,
    boxQuantity: 2,
    extendedWarranty: 5800,
    category: "Gateways",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "21",
    model: "GXW4248V2",
    description: "48 FXS, 1 GigE, GDMS Compatible",
    t2MspStockistPrice: 72105,
    resellerPrice: 90418,
    endCustomerPrice: 99459,
    mrpPrice: 170621,
    boxQuantity: 2,
    extendedWarranty: 7250,
    category: "Gateways",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "22",
    model: "UCM6300A",
    description: "0 FXO, 0 FXS, 250 Users *NO VIDEO Conferencing*",
    t2MspStockistPrice: 12995,
    resellerPrice: 16270,
    endCustomerPrice: 17897,
    mrpPrice: 30702,
    boxQuantity: 8,
    extendedWarranty: 1740,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "23",
    model: "UCM6302A",
    description: "2 FXO, 2 FXS, 500 Users *NO VIDEO Conferencing*",
    t2MspStockistPrice: 22770,
    resellerPrice: 28566,
    endCustomerPrice: 31423,
    mrpPrice: 53905,
    boxQuantity: 8,
    extendedWarranty: 2465,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "24",
    model: "UCM6304A",
    description: "4 FXO, 4 FXS, 1000 Users *NO VIDEO Conferencing*",
    t2MspStockistPrice: 36800,
    resellerPrice: 46078,
    endCustomerPrice: 50686,
    mrpPrice: 86951,
    boxQuantity: 8,
    extendedWarranty: 3625,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "25",
    model: "UCM6308A",
    description: "8 FXO, 8 FXS, 1500 Users *NO VIDEO Conferencing*",
    t2MspStockistPrice: 59455,
    resellerPrice: 74520,
    endCustomerPrice: 81972,
    mrpPrice: 140622,
    boxQuantity: 2,
    extendedWarranty: 5525,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "26",
    model: "UCM6301",
    description: "1 FXO, 1FXS, 500 Users",
    t2MspStockistPrice: 20010,
    resellerPrice: 25088,
    endCustomerPrice: 27597,
    mrpPrice: 47343,
    boxQuantity: 8,
    extendedWarranty: 2175,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "27",
    model: "UCM6302",
    description: "2 FXO, 2FXS, 1000 Users",
    t2MspStockistPrice: 26450,
    resellerPrice: 33161,
    endCustomerPrice: 36478,
    mrpPrice: 62577,
    boxQuantity: 8,
    extendedWarranty: 3045,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "28",
    model: "UCM6304",
    description: "4 FXO, 4 FXS, 2500 Users",
    t2MspStockistPrice: 60145,
    resellerPrice: 75389,
    endCustomerPrice: 82928,
    mrpPrice: 142263,
    boxQuantity: 2,
    extendedWarranty: 7105,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "29",
    model: "UCM6308",
    description: "8 FXO, 8 FXS 5000 Users",
    t2MspStockistPrice: 80040,
    resellerPrice: 100354,
    endCustomerPrice: 110389,
    mrpPrice: 189371,
    boxQuantity: 2,
    extendedWarranty: 9425,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "30",
    model: "UCMRC SOHO",
    description: "Up to 20 Remote Users & 4 Remote Calls",
    t2MspStockistPrice: 7935,
    resellerPrice: 9938,
    endCustomerPrice: 10930,
    mrpPrice: 18750,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "31",
    model: "UCMRC Plus",
    description: "8 Concurrent Voice/Video Calls, 50 Registered Users, 1 GB Cloud Storage",
    t2MspStockistPrice: 11155,
    resellerPrice: 14035,
    endCustomerPrice: 15438,
    mrpPrice: 26484,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "32",
    model: "UCMRC Pro",
    description: "16 Concurrent Voice/Video Calls, 100 Registered Users, 2 GB Cloud Storage",
    t2MspStockistPrice: 17020,
    resellerPrice: 21362,
    endCustomerPrice: 23499,
    mrpPrice: 40312,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "33",
    model: "UCMRC Business",
    description: "32 Concurrent Voice/Video Calls, 200 Registered Users, 5 GB Cloud Storage",
    t2MspStockistPrice: 24380,
    resellerPrice: 30677,
    endCustomerPrice: 33745,
    mrpPrice: 57889,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "34",
    model: "UCMRC Enterprise",
    description: "64 Concurrent Voice/Video Calls, 400 Registered Users, 10 GB Cloud Storage",
    t2MspStockistPrice: 42320,
    resellerPrice: 53033,
    endCustomerPrice: 58337,
    mrpPrice: 100076,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "35",
    model: "UCMRC 50GB Storage Add-On",
    description: "Extra 50 GB Cloud Storage",
    t2MspStockistPrice: 17960,
    resellerPrice: 14904,
    endCustomerPrice: 16394,
    mrpPrice: 28124,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "36",
    model: "UCMRC Admin-Only Add-On",
    description: "1 GB Cloud Storage & Remote Admin features from Plus/Pro plans",
    t2MspStockistPrice: 2875,
    resellerPrice: 3602,
    endCustomerPrice: 3962,
    mrpPrice: 6797,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "37",
    model: "UCMRC Cloud IM Add-On",
    description: "Cloud IM Service (Processing and Storage of IMs in the Cloud)",
    t2MspStockistPrice: 4715,
    resellerPrice: 5962,
    endCustomerPrice: 6558,
    mrpPrice: 11250,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "38",
    model: "UCMRC Extra 400 Users/Extensions",
    description: "Extra 400 Users",
    t2MspStockistPrice: 21620,
    resellerPrice: 27076,
    endCustomerPrice: 29783,
    mrpPrice: 51093,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "39",
    model: "UCMRC Extra 20-Concurrent-Call Add-On",
    description: "Extra 20 Concurrent Calls",
    t2MspStockistPrice: 10925,
    resellerPrice: 13662,
    endCustomerPrice: 15028,
    mrpPrice: 25781,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "40",
    model: "UCMRC Extra 100 Concurrent Call Add-on",
    description: "Only available with Business and Enterprise UCMRC Plans",
    t2MspStockistPrice: 51520,
    resellerPrice: 64594,
    endCustomerPrice: 71042,
    mrpPrice: 121872,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "41",
    model: "CloudUCM Startup",
    description: "Up to 10 Users & 4 Concurrent Audio/Video Calls",
    t2MspStockistPrice: 10120,
    resellerPrice: 12668,
    endCustomerPrice: 13935,
    mrpPrice: 23906,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "42",
    model: "CloudUCM SOHO",
    description: "Up to 20 Users & 8 Concurrent Audio/Video Calls",
    t2MspStockistPrice: 18630,
    resellerPrice: 23350,
    endCustomerPrice: 25685,
    mrpPrice: 44062,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "43",
    model: "CloudUCM Plus",
    description: "Up to 50 Users & 16 Concurrent Audio/Video Calls",
    t2MspStockistPrice: 39790,
    resellerPrice: 49804,
    endCustomerPrice: 54785,
    mrpPrice: 93982,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "44",
    model: "CloudUCM Pro",
    description: "Up to 100 Users & 32 Concurrent Audio/Video Calls",
    t2MspStockistPrice: 76590,
    resellerPrice: 96007,
    endCustomerPrice: 105607,
    mrpPrice: 181168,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "45",
    model: "CloudUCM Business",
    description: "Up to 200 Users & 64 Concurrent Audio/Video Calls",
    t2MspStockistPrice: 118450,
    resellerPrice: 148543,
    endCustomerPrice: 163398,
    mrpPrice: 280307,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "46",
    model: "CloudUCM Extra 50GB Cloud Storage",
    description: "Extra 50GB Cloud Storage",
    t2MspStockistPrice: 15410,
    resellerPrice: 19375,
    endCustomerPrice: 21313,
    mrpPrice: 36562,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "47",
    model: "CloudUCM Extra 200 Users/Extensions",
    description: "Extra 200 Users",
    t2MspStockistPrice: 18285,
    resellerPrice: 22853,
    endCustomerPrice: 25138,
    mrpPrice: 43124,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "48",
    model: "CloudUCM Small Business Value Upgrade Package",
    description: "Up to 16 Users/Extensions & 4 Concurrent Calls",
    t2MspStockistPrice: 5520,
    resellerPrice: 6831,
    endCustomerPrice: 7514,
    mrpPrice: 12890,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "49",
    model: "CloudUCM Custom Logo Package",
    description: "Extra Custom Logo/Top-Domain Name",
    t2MspStockistPrice: 1380,
    resellerPrice: 1739,
    endCustomerPrice: 1913,
    mrpPrice: 3281,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "50",
    model: "Software UCM Base Package",
    description: "Annual Base License Fee - 50 Users, 24 Concurrent Calls",
    t2MspStockistPrice: 20815,
    resellerPrice: 26082,
    endCustomerPrice: 28690,
    mrpPrice: 49218,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "51",
    model: "Software UCM Upgrade-50 Package",
    description: "Annual Upgrade License Fee - Extra 50 Users, 16 Concurrent Calls",
    t2MspStockistPrice: 14720,
    resellerPrice: 18506,
    endCustomerPrice: 20356,
    mrpPrice: 34921,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "52",
    model: "Software UCM Upgrade-250 Package",
    description: "Annual Upgrade License Fee - Extra 250 Users, 64 Concurrent Calls",
    t2MspStockistPrice: 61755,
    resellerPrice: 77501,
    endCustomerPrice: 85251,
    mrpPrice: 146247,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "IP-PBX",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "53",
    model: "GCC6010",
    description: "default 12 users/4 concurrent calls, 1st year security update FREE",
    t2MspStockistPrice: 12420,
    resellerPrice: 15649,
    endCustomerPrice: 17214,
    mrpPrice: 29531,
    boxQuantity: 10,
    extendedWarranty: 1450,
    category: "Convergence Products",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "54",
    model: "GCC6010W",
    description: "default 12 users/4 concurrent calls, 1st year security update FREE",
    t2MspStockistPrice: 14605,
    resellerPrice: 18382,
    endCustomerPrice: 20220,
    mrpPrice: 34687,
    boxQuantity: 8,
    extendedWarranty: 1595,
    category: "Convergence Products",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "55",
    model: "GCC6011",
    description: "default 12 users/4 concurrent calls, 1st year security update FREE",
    t2MspStockistPrice: 17480,
    resellerPrice: 21859,
    endCustomerPrice: 24045,
    mrpPrice: 41249,
    boxQuantity: 6,
    extendedWarranty: 1885,
    category: "Convergence Products",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "56",
    model: "GCC6020 (NEW, 1H Jun)",
    description:
      "Built-in IPPBX (12 Users, 4 Concurrent Calls) + enterprise-grade firewall + VPN Router + 1 x 2.5 Gb, 1 x 10 Gig SFP+, 4 x GigE Network Switch",
    t2MspStockistPrice: 21505,
    resellerPrice: 26951,
    endCustomerPrice: 29647,
    mrpPrice: 50858,
    boxQuantity: 1,
    extendedWarranty: 0,
    category: "Convergence Products",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "57",
    model: "GCC6021 (NEW 1H Jun)",
    description:
      "Built-in IPPBX (12 Users, 4 Concurrent Calls) + enterprise-grade firewall + VPN Router + 8 x 2.5 Gb, 4 x 10 Gig SFP+, 16 x GigE Network Switch",
    t2MspStockistPrice: 49105,
    resellerPrice: 61603,
    endCustomerPrice: 67764,
    mrpPrice: 116248,
    boxQuantity: 1,
    extendedWarranty: 0,
    category: "Convergence Products",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "58",
    model: "GCC-UC-50-SMB Upgrade",
    description: "50 UC users/12 concurrent calls, 1-time-only fee",
    t2MspStockistPrice: 2875,
    resellerPrice: 3602,
    endCustomerPrice: 3962,
    mrpPrice: 6797,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "Convergence Products",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "59",
    model: "GCC-UC-Extra-50-EXT Upgrade",
    description: "extra 50 users/extensions (up to total 200 users/extensions), 1-time-only fee",
    t2MspStockistPrice: 1265,
    resellerPrice: 1615,
    endCustomerPrice: 1776,
    mrpPrice: 3047,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "Convergence Products",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "60",
    model: "GCC-UC-Extra-4-Call Upgrade",
    description: "extra 4 concurrent calls (up to total 24 concurrent calls), 1-time-only fee",
    t2MspStockistPrice: 1265,
    resellerPrice: 1615,
    endCustomerPrice: 1776,
    mrpPrice: 3047,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "Convergence Products",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "61",
    model: "GCC-Security-1H",
    description: "1 Year Security Update Package",
    t2MspStockistPrice: 3795,
    resellerPrice: 4844,
    endCustomerPrice: 5328,
    mrpPrice: 9140,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "Convergence Products",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "62",
    model: "GCC-Security-3H",
    description: "3 Year Security Update Package",
    t2MspStockistPrice: 7935,
    resellerPrice: 9936,
    endCustomerPrice: 10930,
    mrpPrice: 18750,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "Convergence Products",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "63",
    model: "GCC-Security-Life",
    description: "Lifetime Security Update Package",
    t2MspStockistPrice: 14720,
    resellerPrice: 18506,
    endCustomerPrice: 20356,
    mrpPrice: 34921,
    boxQuantity: 0,
    extendedWarranty: 0,
    category: "Convergence Products",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "64",
    model: "DP720",
    description: "HD DECT Handset",
    t2MspStockistPrice: 4025,
    resellerPrice: 5092,
    endCustomerPrice: 5601,
    mrpPrice: 9609,
    boxQuantity: 16,
    extendedWarranty: 435,
    category: "Wireless IP Phones",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "65",
    model: "DP750",
    description: "HD DECT Base Station",
    t2MspStockistPrice: 3795,
    resellerPrice: 4844,
    endCustomerPrice: 5328,
    mrpPrice: 9140,
    boxQuantity: 16,
    extendedWarranty: 435,
    category: "Wireless IP Phones",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "66",
    model: "DP722",
    description: "HD Mid-Tier DECT Handset",
    t2MspStockistPrice: 4025,
    resellerPrice: 5092,
    endCustomerPrice: 5601,
    mrpPrice: 9609,
    boxQuantity: 16,
    extendedWarranty: 435,
    category: "Wireless IP Phones",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "67",
    model: "DP725",
    description: "HD Compact DECT Handset",
    t2MspStockistPrice: 4025,
    resellerPrice: 5092,
    endCustomerPrice: 5601,
    mrpPrice: 9609,
    boxQuantity: 16,
    extendedWarranty: 435,
    category: "Wireless IP Phones",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "68",
    model: "DP730",
    description: "HD High-Tier DECT Handset",
    t2MspStockistPrice: 6555,
    resellerPrice: 8197,
    endCustomerPrice: 9017,
    mrpPrice: 15468,
    boxQuantity: 24,
    extendedWarranty: 725,
    category: "Wireless IP Phones",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "69",
    model: "DP735",
    description: "Ruggedized High-Tier DECT Handset",
    t2MspStockistPrice: 6555,
    resellerPrice: 8197,
    endCustomerPrice: 9017,
    mrpPrice: 15468,
    boxQuantity: 24,
    extendedWarranty: 725,
    category: "Wireless IP Phones",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "70",
    model: "DP752",
    description: "HD DECT Base Station, PTT, extended range",
    t2MspStockistPrice: 3795,
    resellerPrice: 4844,
    endCustomerPrice: 5328,
    mrpPrice: 9140,
    boxQuantity: 16,
    extendedWarranty: 435,
    category: "Wireless IP Phones",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "71",
    model: "DP755",
    description: "Carrier Grade HD DECT Base Station, PTT, extended range, 20 concurrent calls",
    t2MspStockistPrice: 3565,
    resellerPrice: 4471,
    endCustomerPrice: 4918,
    mrpPrice: 8437,
    boxQuantity: 16,
    extendedWarranty: 435,
    category: "Wireless IP Phones",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "72",
    model: "DP760",
    description: "HD DECT Repeater Station",
    t2MspStockistPrice: 8165,
    resellerPrice: 10309,
    endCustomerPrice: 11339,
    mrpPrice: 19453,
    boxQuantity: 16,
    extendedWarranty: 1160,
    category: "Wireless IP Phones",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "73",
    model: "WP810",
    description: "Portable WiFi Phone",
    t2MspStockistPrice: 6095,
    resellerPrice: 7700,
    endCustomerPrice: 8470,
    mrpPrice: 14531,
    boxQuantity: 16,
    extendedWarranty: 725,
    category: "Wireless IP Phones",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "74",
    model: "WP816",
    description: "Compact Portable WiFi Phone",
    t2MspStockistPrice: 5060,
    resellerPrice: 6458,
    endCustomerPrice: 7104,
    mrpPrice: 12187,
    boxQuantity: 16,
    extendedWarranty: 580,
    category: "Wireless IP Phones",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "75",
    model: "WP820",
    description: "Enterprise Portable WiFi Phone",
    t2MspStockistPrice: 9660,
    resellerPrice: 12047,
    endCustomerPrice: 13252,
    mrpPrice: 22734,
    boxQuantity: 24,
    extendedWarranty: 1305,
    category: "Wireless IP Phones",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "76",
    model: "WP822",
    description: "Enterprise Portable WiFi Phone, Unified Linux Firmware, extended battery",
    t2MspStockistPrice: 7935,
    resellerPrice: 9936,
    endCustomerPrice: 10930,
    mrpPrice: 18750,
    boxQuantity: 28,
    extendedWarranty: 1015,
    category: "Wireless IP Phones",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "77",
    model: "WP825",
    description: "Ruggedized WiFi Phone, extended battery",
    t2MspStockistPrice: 10925,
    resellerPrice: 13662,
    endCustomerPrice: 15028,
    mrpPrice: 25781,
    boxQuantity: 28,
    extendedWarranty: 1450,
    category: "Wireless IP Phones",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "78",
    model: "WP826",
    description: "Compact Portable WiFi Phone",
    t2MspStockistPrice: 6440,
    resellerPrice: 8073,
    endCustomerPrice: 8880,
    mrpPrice: 15234,
    boxQuantity: 16,
    extendedWarranty: 870,
    category: "Wireless IP Phones",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "79",
    model: "WP836",
    description: "Portable WiFi Phone, 2.8 in screen, Bluetooth",
    t2MspStockistPrice: 10005,
    resellerPrice: 12544,
    endCustomerPrice: 13799,
    mrpPrice: 23671,
    boxQuantity: 16,
    extendedWarranty: 1160,
    category: "Wireless IP Phones",
    lastUpdated: "2024-01-15",
    status: "active",
  },
  {
    id: "80",
    model: "WP856",
    description: "Android Wi-Fi smartphone with built-in scanner",
    t2MspStockistPrice: 55315,
    resellerPrice: 69428,
    endCustomerPrice: 76371,
    mrpPrice: 131013,
    boxQuantity: 8,
    extendedWarranty: 5800,
    category: "Wireless IP Phones",
    lastUpdated: "2024-01-15",
    status: "active",
  },
]

export default function PricelistPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [pricelistItems, setPricelistItems] = useState<PricelistItem[]>(telecomPricelistData)

  const categories = ["all", ...Array.from(new Set(telecomPricelistData.map((item) => item.category)))]

  const filteredItems = pricelistItems.filter((item) => {
    const matchesSearch =
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const calculateTotalValue = () => {
    return pricelistItems.reduce((sum, item) => sum + item.mrpPrice, 0)
  }

  const calculateAveragePrice = () => {
    return pricelistItems.reduce((sum, item) => sum + item.mrpPrice, 0) / pricelistItems.length
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pricelist Management</h1>
            <p className="text-gray-600 mt-1">Manage telecommunications product prices and pricing tiers</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Upload className="w-4 h-4" />
              Import
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Item
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by model or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pricelistItems.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {pricelistItems.filter((item) => item.status === "active").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(calculateTotalValue())}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg. MRP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(calculateAveragePrice())}</div>
            </CardContent>
          </Card>
        </div>

        {/* Pricelist Table */}
        <Card>
          <CardHeader>
            <CardTitle>Telecommunications Pricelist ({filteredItems.length} products)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Model</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Description</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">T2 MSP Stockist</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Re-seller Price</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">End Customer</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">MRP</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-600">Box Qty</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Ext. Warranty</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{item.model}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-gray-600 max-w-xs">{item.description}</div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-medium">{formatCurrency(item.t2MspStockistPrice)}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-medium">{formatCurrency(item.resellerPrice)}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-medium">{formatCurrency(item.endCustomerPrice)}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-bold text-blue-600">{formatCurrency(item.mrpPrice)}</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="outline">{item.boxQuantity}</Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="text-sm text-gray-600">{formatCurrency(item.extendedWarranty)}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={item.status === "active" ? "default" : "secondary"}>{item.status}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No products found matching your search criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pricing Reference Image */}
        <Card>
          <CardHeader>
            <CardTitle>Reference Pricelist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-f8CQeadqqj4Y3idpq7dmXTvd2G7fgA.png"
                alt="Telecommunications Products Pricelist Reference"
                className="max-w-full h-auto border rounded-lg shadow-sm"
              />
              <p className="text-sm text-gray-500 mt-2">Original pricelist reference document</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
