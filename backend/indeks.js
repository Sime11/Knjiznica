const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));


const connection = mysql.createConnection({
  host: "ucka.veleri.hr",
  user: "sjuresko",
  password: "11",
  database: "sjuresko",
});

connection.connect(function (err) {
  if (err) {
    console.error("Greška prilikom spajanja na bazu:", err);
    process.exit(1); // Prekini aplikaciju ako povezivanje ne uspije
  }
  console.log("Connected to the database!");
});

app.use(cors());

// Osnovna ruta za GET / koja će samo vratiti poruku ili može preusmjeriti na frontend
app.get("/", (req, res) => {
  res.send("Pozdrav!");
});


// API za sve knjige (lista)
app.get("/api/knjige", (req, res) => {
  connection.query("SELECT * FROM knjige", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// API: lista knjiga po naslovu
app.get("/api/knjige/naslov/:naslov", (req, res) => {
  const naslov = `%${req.params.naslov}%`;
  connection.query(
    "SELECT * FROM knjige WHERE naslov LIKE ?",
    [naslov],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

// API: lista knjiga po autoru
app.get("/api/knjige/autor/:autor", (req, res) => {
  const autor = `%${req.params.autor}%`;
  connection.query(
    "SELECT * FROM knjige WHERE autor LIKE ?",
    [autor],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

// API: Lista slobodnih knjiga
app.get("/api/slob_knjige", (req, res) => {
  const query = `
  SELECT 
  (knjige.stanje - COUNT(rezervacija.knjiga_id)) AS slobodne, 
  knjige.id, knjige.naslov, knjige.stanje 
  FROM knjige 
  LEFT JOIN rezervacija ON knjige.id = rezervacija.knjiga_id 
  GROUP BY knjige.id`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// API: Provjera ako je knjiga slobodna
app.get("/api/slob_knjige/:id_knjige", (req, res) => {
  const id_knjige = req.params.id_knjige;
  const query = `
  SELECT (knjige.stanje - COUNT(rezervacija.knjiga_id)) AS slobodne 
  FROM knjige 
  LEFT JOIN rezervacija ON knjige.id = rezervacija.knjiga_id 
  WHERE knjige.id = ? 
  GROUP BY knjige.id`;
  connection.query(query, [id_knjige], (error, results) => {
    if (error) throw error;
    res.send(results[0] || { slobodne: 0 });
  });
});

// API za rezervirane knjige
app.get("/api/rezervirane_knjige", (req, res) => {
  const query = `
    SELECT knjige.naslov, knjige.autor, korisnici.ime, korisnici.prezime, rezervacija.datum_rezervacija
    FROM rezervacija
    JOIN knjige ON rezervacija.knjiga_id = knjige.id
    JOIN korisnici ON rezervacija.korisnik_id = korisnici.id
  `;
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Greška prilikom dohvaćanja rezerviranih knjiga:", error);
      res.status(500).send("Greška prilikom dohvaćanja rezerviranih knjiga");
    } else {
      res.json(results);  // Vraća rezervirane knjige
    }
  });
});




// API: Lista rezerviranih knjiga
app.get("/api/rezerv_knjige", (req, res) => {
  const query = `
  SELECT * 
  FROM knjige, rezervacija
  WHERE knjige.id = rezervacija.knjiga_id`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// API: Lista rezerviranih knjiga s korisnicima
app.get("/api/rezerv_knjige_korisnici", (req, res) => {
  const query = `
  SELECT * 
  FROM knjige, rezervacija, korisnici 
  WHERE knjige.id = rezervacija.knjiga_id 
  AND korisnici.id = rezervacija.korisnik_id`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// API: Lista rezerviranih knjiga za korisnika
app.get("/api/rezerv_knjige/:korisnik_id", (req, res) => {
  const korisnik_id = req.params.korisnik_id;
  const query = `
  SELECT * 
  FROM knjige, rezervacija, korisnici 
  WHERE knjige.id = rezervacija.knjiga_id 
  AND korisnici.id = rezervacija.korisnik_id
  AND korisnici.id = ?`;
  connection.query(query, [korisnik_id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// API: Lista rezervacija za knjigu
app.get("/api/rezerv_knjige_knjiga/:knjiga_id", (req, res) => {
  const knjiga_id = req.params.knjiga_id;
  const query = `
  SELECT *
  FROM knjige, rezervacija, korisnici  
  WHERE knjige.id = rezervacija.knjiga_id
  AND korisnici.id = rezervacija.korisnik_id
  AND knjige.id = ?`;
  connection.query(query, [knjiga_id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// API: Lista svih korisnika
app.get("/api/korisnici", (req, res) => {
  connection.query("SELECT * FROM korisnici", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// API: Detalji korisnika po ID-u
app.get("/api/korisnici/:korisnik_id", (req, res) => {
  const korisnik_id = req.params.korisnik_id;
  connection.query(
    "SELECT * FROM korisnici WHERE id = ?",
    [korisnik_id],
    (error, results) => {
      if (error) throw error;
      res.send(results[0]);
    }
  );
});

// API: Ažuriranje korisnika
app.put("/api/korisnici/:korisnik_id", (req, res) => {
  const korisnik_id = req.params.korisnik_id;
  const data = req.body;
  connection.query(
    "UPDATE korisnici SET ? WHERE id = ?",
    [data, korisnik_id],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

// API: Rezervacija knjige
app.post("/api/rezerv_knjige/:knjiga_id", (req, res) => {
  const knjiga_id = req.params.knjiga_id;
  const { korisnik_id, datum } = req.body;
  const query = `
  INSERT INTO rezervacija (datum_rezervacija, knjiga_id, korisnik_id) 
  VALUES (?, ?, ?)`;
  connection.query(query, [datum, knjiga_id, korisnik_id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// API: Brisanje rezervacija
app.delete("/api/rezerv_knjige/:knjiga_id", (req, res) => {
  const knjiga_id = req.params.knjiga_id;
  connection.query(
    "DELETE FROM rezervacija WHERE knjiga_id = ?",
    [knjiga_id],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});
// API: (1.Zadatak) Provjera koliko knjiga korisnik posjeduje (id_korisnik)
app.get("/api/korisnik/:id_korisnik/broj_knjiga", (req, res) => {
    const korisnikId = req.params.id_korisnik;
    const query = `
      SELECT COUNT(*) AS broj_knjiga 
      FROM rezervacija
      WHERE korisnik_id = ?`;
  
    connection.query(query, [korisnikId], (error, results) => {
      if (error) {
        console.error("Greška prilikom izvršavanja upita:", error);
        res.status(500).send("Greška na serveru");
      } else {
        res.json(results[0]); 
      }
    });
  });
  // API:(2.zadatak) Provjera slobodnih primjeraka za određenu knjigu
app.get("/api/slobodni_primjerci/:id_knjige", (req, res) => {
    const id_knjige = req.params.id_knjige;
    const query = `
      SELECT 
        stanje - COALESCE((SELECT COUNT(*) 
                           FROM rezervacija
                           WHERE knjiga_id = ?), 0) AS slobodni 
      FROM knjige 
      WHERE id = ?;
    `;
  
    connection.query(query, [id_knjige, id_knjige], (error, results) => {
      if (error) {
        console.error("Greška prilikom provjere slobodnih primjeraka:", error);
        res.status(500).send("Greška na serveru");
      } else {
        res.json(results[0]); 
      }
    });
  });

  // API:(3. zadatak) Broj rezerviranih primjeraka za određenu knjigu
app.get("/api/rezervirani_primjerci/:id_knjige", (req, res) => {
    const id_knjige = req.params.id_knjige;
  
    const query = `
      SELECT COUNT(*) AS rezervirani 
      FROM rezervacija 
      WHERE knjiga_id = ?;
    `;
  
    connection.query(query, [id_knjige], (error, results) => {
      if (error) {
        console.error("Greška prilikom dohvaćanja rezerviranih primjeraka:", error);
        res.status(500).send("Greška na serveru");
      } else {
        res.json(results[0]); 
      }
    });
  });

  // API:(4. zadatak) Dohvat korisnika koji posjeduju određenu knjigu
app.get("/api/korisnici_za_knjigu/:id_knjige", (req, res) => {
    const id_knjige = req.params.id_knjige;
  
    const query = `
      SELECT korisnici.id, korisnici.ime, korisnici.prezime, korisnici.email, korisnici.broj_telefona 
      FROM korisnici
      JOIN rezervacija ON korisnici.id = rezervacija.korisnik_id
      WHERE rezervacija.knjiga_id = ?;
    `;
  
    connection.query(query, [id_knjige], (error, results) => {
      if (error) {
        console.error("Greška prilikom dohvaćanja korisnika za knjigu:", error);
        res.status(500).send("Greška na serveru");
      } else {
        res.json(results);
      }
    });
  });

  // API:/(5. zadatatak) Ukupan broj svih primjeraka svih knjiga
app.get("/api/ukupno_primjeraka", (req, res) => {
    const query = `
      SELECT SUM(stanje) AS ukupno_primjeraka 
      FROM knjige;
    `;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Greška prilikom dohvaćanja ukupnog broja primjeraka:", error);
        res.status(500).send("Greška na serveru");
      } else {
        res.json(results[0]); 
      }
    });
  });

  // API:(6. zadatak) Ukupan broj svih rezerviranih primjeraka
app.get("/api/ukupno_rezervirano", (req, res) => {
    const query = `
      SELECT COUNT(*) AS ukupno_rezervirano 
      FROM rezervacija;
    `;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Greška prilikom dohvaćanja ukupnog broja rezerviranih primjeraka:", error);
        res.status(500).send("Greška na serveru");
      } else {
        res.json(results[0]); 
      }
    });
  });

  // API:(7. zadatak) Ukupan broj svih slobodnih primjeraka
app.get("/api/ukupno_slobodno", (req, res) => {
    const query = `
      SELECT SUM(knjige.stanje - COALESCE(rezervacija.rezervirano, 0)) AS slobodno_primjeraka
      FROM knjige
      LEFT JOIN (
        SELECT knjiga_id, COUNT(*) AS rezervirano
        FROM rezervacija
        GROUP BY knjiga_id
      ) AS rezervacija ON knjige.id = rezervacija.knjiga_id;
    `;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Greška prilikom dohvaćanja slobodnih primjeraka:", error);
        res.status(500).send("Greška na serveru");
      } else {
        res.json(results[0]); 
      }
    });
  });
  
  // API:(8. zadatak) Dohvat knjiga koje imaju manje od 3 primjerka
app.get("/api/knjige_manje_od_3", (req, res) => {
    const query = `
      SELECT * 
      FROM knjige
      WHERE stanje < 3;
    `;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Greška prilikom dohvaćanja knjiga s manje od 3 primjerka:", error);
        res.status(500).send("Greška na serveru");
      } else {
        res.json(results);
      }
    });
  });
  
  // API:(9. zadatak) Dohvat korisnika s rezerviranim knjigama duže od mjesec dana
app.get("/api/korisnici_duze_od_mjesec", (req, res) => {
    const query = `
      SELECT korisnici.id, korisnici.ime, korisnici.prezime, korisnici.email, korisnici.broj_telefona, 
             rezervacija.knjiga_id, rezervacija.datum_rezervacija
      FROM korisnici
      JOIN rezervacija ON korisnici.id = rezervacija.korisnik_id
      WHERE rezervacija.datum_rezervacija < CURDATE() - INTERVAL 1 MONTH;
    `;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Greška prilikom dohvaćanja korisnika s rezerviranim knjigama duže od mjesec dana:", error);
        res.status(500).send("Greška na serveru");
      } else {
        res.json(results); 
      }
    });
  });

  // API:(11. zadatal) Dohvat emaila, broja telefona, naslova knjige i datuma rezervacija za korisnike s rezervacijama duže od mjesec dana
app.get("/api/kontakt_duge_rezervacija", (req, res) => {
    const query = `
      SELECT korisnici.email, korisnici.broj_telefona, knjige.naslov, rezervacija.datum_rezervacija
      FROM korisnici
      JOIN rezervacija ON korisnici.id = rezervacija.korisnik_id
      JOIN knjige ON rezervacija.knjiga_id = knjige.id
      WHERE rezervacija.datum_rezervacija < CURDATE() - INTERVAL 1 MONTH;
    `;
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Greška prilikom dohvaćanja podataka za kontaktiranje korisnika:", error);
        res.status(500).send("Greška na serveru");
      } else {
        res.json(results); 
      }
    });
  });

  // API:(12. zadatak) Provjera ima li korisnik rezervirana dva ili više primjeraka iste knjige
app.get("/api/rezervacija_iste_knjige/:korisnik_id", (req, res) => {
    const korisnik_id = req.params.korisnik_id;
  
    const query = `
      SELECT knjige.naslov, COUNT(*) AS broj_rezervacija
      FROM rezervacija
      JOIN knjige ON rezervacija.knjiga_id = knjige.id
      WHERE rezervacija.korisnik_id = ?
      GROUP BY rezervacija.knjiga_id
      HAVING broj_rezervacija >= 2;
    `;
  
    connection.query(query, [korisnik_id], (error, results) => {
      if (error) {
        console.error("Greška prilikom provjere rezervacija iste knjige:", error);
        res.status(500).send("Greška na serveru");
      } else {
        res.json(results); 
      }
    });
  });

  // API:(13. zadatak) Ažuriranje podataka o korisniku
app.put("/api/korisnici/:korisnik_id", (req, res) => {
    const korisnik_id = req.params.korisnik_id;
    const { ime, prezime, email, broj_telefona } = req.body;
  
    const query = `
      UPDATE korisnici
      SET ime = ?, prezime = ?, email = ?, broj_telefona = ?
      WHERE id = ?;
    `;
  
    connection.query(query, [ime, prezime, email, broj_telefona, korisnik_id], (error, results) => {
      if (error) {
        console.error("Greška prilikom ažuriranja podataka o korisniku:", error);
        res.status(500).send("Greška na serveru");
      } else {
        res.json({ message: "Podaci korisnika su uspješno ažurirani" });
      }
    });
  });
  
  
  
  
  
  
  
  
  
  

// Pokretanje servera
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

