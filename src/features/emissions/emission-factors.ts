export interface EmissionFactor {
    id: string;
    category: string;
    name: string;
    unit: string;
    factor: number;
    source: string;
    year: number;
}

export const emissionFactors: EmissionFactor[] = [
    // Scope 2 - Electricity
    {
        id: "elec-tr-2024",
        category: "Electricity",
        name: "Türkiye Şebeke Elektriği",
        unit: "kWh",
        factor: 0.00045,
        source: "EPDK / Turkiye Grid",
        year: 2024,
    },
    // Scope 1 - Fuels
    {
        id: "natgas-m3",
        category: "Stationary Combustion",
        name: "Doğalgaz",
        unit: "m3",
        factor: 0.00202,
        source: "DEFRA",
        year: 2024,
    },
    {
        id: "diesel-litre",
        category: "Mobile Combustion",
        name: "Motorin",
        unit: "Litre",
        factor: 0.00267,
        source: "DEFRA",
        year: 2024,
    },
    {
        id: "gasoline-litre",
        category: "Mobile Combustion",
        name: "Benzin",
        unit: "Litre",
        factor: 0.00231,
        source: "DEFRA",
        year: 2024,
    },
    // Scope 3 - Examples (if needed later)
    {
        id: "waste-kg",
        category: "Waste",
        name: "Genel Atık",
        unit: "kg",
        factor: 0.0005,
        source: "IPCC",
        year: 2024,
    },
];

export function getFactorById(id: string): EmissionFactor | undefined {
    return emissionFactors.find((f) => f.id === id);
}

export function getFactorsByCategory(category: string): EmissionFactor[] {
    return emissionFactors.filter((f) => f.category === category);
}
