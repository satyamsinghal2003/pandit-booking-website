import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import panditImage from "../../public/images/pandit-user.png";
import { Calendar1Icon, Languages } from "lucide-react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const defaultForm = {
    name: "Pandit Name",
    experience: "5",
    description: "Pandit Ji with 4 years of extensive experience in conducting traditional rituals, specializing in Wedding Poojas and Grah Pravesh Poojas. Known for their deep knowledge of Vedic scriptures and precise adherence to rituals, they provide a spiritually uplifting and culturally authentic experience. Fluent in Hindi, Marathi, and Sanskrit, Pandit Ji ensures seamless communication and a personalized approach to every ceremony, catering to the unique needs of families and traditions.",
    availability: [...days],
    languages: ["Hindi", "Sanskrit", "Marathi"],
    pooja_types: ["Hawan & Yagnas", "Ramayan Path"],
    location: "Ghaziabad",
};

export default function PanditRegistration() {
    const [formData, setFormData] = useState(defaultForm);
    const [rawLanguages, setRawLanguages] = useState(formData.languages.join(", "));
    const [rawPoojaTypes, setRawPoojaTypes] = useState(formData.pooja_types.join(", "));
    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleMultiToggle = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: prev[key].includes(value)
                ? prev[key].filter((v) => v !== value)
                : [...prev[key], value],
        }));
    };

    // const handleListInputChange = (key, value) => {
    //     const items = value.split(",").map((item) => item.trim()).filter(Boolean);
    //     setFormData((prev) => ({ ...prev, [key]: items }));
    // };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 mx-24">
            {/* LEFT SIDE - Preview */}
            <div className="rounded-2xl border p-6 shadow-sm bg-white space-y-4">
                <div className="flex items-center gap-4">
                    <img
                        src={panditImage}
                        alt="Pandit"
                        className="w-24 h-24 rounded-full object-cover border"
                    />
                    <div>
                        <h2 className="text-3xl font-bold">{formData.name || "Pandit Name"}</h2>
                        <p className="text-muted-foreground">
                            Experience: {formData.experience || "0"} Years
                        </p>
                        <div className="flex items-center gap-1">
                            <div className="text-yellow-500 text-lg">★★★☆☆</div>
                            <span className="text-sm text-muted-foreground">(3.0)</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold flex items-center gap-1 p-2"><Languages className="h-5 w-5 text-orange-500" /> Description</h4>
                    <p className="text-md mb-8">{formData.description}</p>
                </div>

                <div>
                    <h4 className="font-semibold flex items-center gap-1 pb-4"><Calendar1Icon className="h-5 w-5 text-orange-500" /> Availability</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {formData.availability.map((day) => (
                            <span
                                key={day}
                                className="bg-orange-100 text-orange-900 text-sm px-2 py-1 rounded-full"
                            >
                                {day}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold flex items-center gap-1 pt-4 pb-2"><Languages className="h-5 w-5 text-orange-500" /> Languages</h4>
                    <p className="text-md">{formData.languages.join(", ")}</p>
                </div>

                <div>
                    <h4 className="font-semibold flex items-center gap-1 pt-4 pb-2"><Languages className="h-5 w-5 text-orange-500" /> Pooja Types</h4>
                    <p className="text-md">{formData.pooja_types.join(", ")}</p>
                </div>

                <div>
                    <h4 className="font-semibold flex items-center gap-1 pt-4 pb-2"><Languages className="h-5 w-5 text-orange-500" /> Location</h4>
                    <p className="text-md">{formData.location}</p>
                </div>
            </div>

            {/* RIGHT SIDE - Form */}
            <form
                className="rounded-2xl border p-6 shadow-sm bg-white space-y-4"
                onSubmit={async (e) => {
                    e.preventDefault();

                    const updatedData = {
                        ...formData,
                        description: formData.description,
                        languages: rawLanguages.split(",").map((item) => item.trim()).filter(Boolean),
                        pooja_types: rawPoojaTypes.split(",").map((item) => item.trim()).filter(Boolean),
                    };

                    console.log(updatedData)
                    const { data, error } = await supabase
                        .from("pandits")
                        .insert([updatedData]);

                    if (error) {
                        console.error("Error inserting data:", error.message);
                        alert("Error: " + error.message);
                    } else {
                        console.log("Inserted:", data);
                        navigate("/searchPandits?city=&puja=")                      
                        
                    }
                }}
            >
                <div>
                    <Label>Name</Label>
                    <Input value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
                </div>
                <div>
                    <Label>Experience (in years)</Label>
                    <Input
                        type="number"
                        value={formData.experience}
                        onChange={(e) => handleChange("experience", e.target.value)}
                    />
                </div>
                <div>
                    <Label>Description</Label>
                    <Textarea
                        className="h-32"
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                    />
                </div>

                <div>
                    <Label>Availability</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                        {days.map((day) => (
                            <label key={day} className="flex items-center gap-2 text-sm">
                                <Checkbox
                                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                                    checked={formData.availability.includes(day)}
                                    onCheckedChange={() => handleMultiToggle("availability", day)}
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <Label>Languages (comma-separated)</Label>
                    <Input
                        value={rawLanguages}
                        onChange={(e) => {
                            const value = e.target.value;
                            setRawLanguages(value);
                            handleChange(
                                "languages",
                                value.split(",").map((item) => item.trim()).filter(Boolean)
                            );
                        }}
                    />
                </div>

                <div>
                    <Label>Pooja Types (comma-separated)</Label>
                    <Input
                        value={rawPoojaTypes}
                        onChange={(e) => {
                            const value = e.target.value;
                            setRawPoojaTypes(value);
                            handleChange(
                                "pooja_types",
                                value.split(",").map((item) => item.trim()).filter(Boolean)
                            );
                        }}
                    />
                </div>

                <div>
                    <Label>Location</Label>
                    <Input
                        value={formData.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                    />
                </div>

                <Button type="submit" className="mt-4 bg-orange-600">
                    Submit
                </Button>
            </form>
        </div>
    );
}
