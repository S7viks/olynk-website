import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bmfakoiiebmsgdtimwdu.supabase.co';
const supabaseKey = 'sb_publishable_MNFxxlp3Imwbj_yVEI7TGw_iOuFQOBL';
const supabase = createClient(supabaseUrl, supabaseKey);

const firstNames = ['James', 'Emma', 'Michael', 'Sophia', 'William', 'Isabella', 'David', 'Mia', 'Richard', 'Charlotte', 'Joseph', 'Amelia', 'Thomas', 'Harper', 'Charles', 'Evelyn', 'Daniel', 'Abigail', 'Matthew', 'Emily', 'Alexander', 'Elizabeth', 'Lucas', 'Mila', 'Henry', 'Ella'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris'];
const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'company.com', 'techstartup.io', 'enterprise.net', 'agency.co'];
const painPoints = ["Stockouts & Oversells", "Demand Planning", "Channel Sync Issues", "Supply Chain Chaos", "Too Much Manual Work"];
const roles = ['CEO', 'CTO', 'Founder', 'Operations Manager', 'Supply Chain Director', 'Engineer', 'Product Manager'];
const sizes = ["Solo", "2-10", "11-50", "51-200", "200+"];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const numRecords = 247;
const records = [];

for (let i = 0; i < numRecords; i++) {
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const fullName = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}@${getRandomItem(domains)}`;
    
    // Pick 1-3 random pain points
    const userPainPoints = [];
    const numPainPoints = Math.floor(Math.random() * 3) + 1;
    for(let j = 0; j < numPainPoints; j++) {
        const point = getRandomItem(painPoints);
        if(!userPainPoints.includes(point)) userPainPoints.push(point);
    }

    records.push({
        full_name: fullName,
        email: email,
        company_name: `${lastName} Co`,
        website: `www.${lastName.toLowerCase()}co.com`,
        company_size: getRandomItem(sizes),
        role: getRandomItem(roles),
        pain_points: userPainPoints
    });
}

async function seed() {
    console.log(`Inserting ${records.length} records...`);
    const { data, error } = await supabase.from('waitlist').insert(records);
    if (error) {
        console.error('Error inserting records:', error);
    } else {
        console.log('Successfully inserted records.');
    }
}

seed();
