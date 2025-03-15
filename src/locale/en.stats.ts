export const en = {
  main: {
    title: "Stats viewer",
    fileInput: "File input",
    noFileLoaded: "No stats file loaded",
    multipleFilesLoaded: "Multiple files selected",
  },
  options: {
    showDetails: "Show Details",
    teamMode: "Team mode",
  },
  statsCharts: {
    observerPrefix: "Obs",
    metrics: {
      currentMoney: {
        name: "Current money",
        description: "Money [CR] over time",
      },
      minedMoney: {
        name: "Mined money",
        description: "Money [CR] mined over time",
      },
      spentMoney: {
        name: "Spent money",
        description: "Money [CR] spent over time",
      },
      buildingsCost: {
        name: "Buildings cost",
        description: "Buildings cost [CR] over time",
      },
      buildingWeaponsCost: {
        name: "Building weapons cost",
        description: "Building weapons cost [CR] over time",
      },
      unitsCost: {
        name: "Units cost",
        description: "Units cost [CR] over time",
      },
      researchesCost: {
        name: "Researches cost",
        description: "Researches cost [CR] over time",
      },
      ammoCost: {
        name: "Ammo cost",
        description: "Ammo cost [CR] over time",
      },
      moneyTransferred: {
        name: "Money transferred",
        description: "Money [CR] transferred to allies",
      },
      moneyFlow: {
        name: "Money flow",
        description: "Money [CR] mined in time span of previous 60 seconds",
      },
      researchesCount: {
        name: "Researches count",
        description: "Number of researches over time",
      },
      buildingsBuilt: {
        name: "Buildings built",
        description: "Number of buildings built over time",
      },
      buildingsLost: {
        name: "Buildings lost",
        description: "Number of buildings lost over time",
      },
      unitsBuilt: {
        name: "Units built",
        description: "Number of units built over time",
      },
      unitsLost: {
        name: "Units lost",
        description: "Number of units lost over time",
      },
      destroyedUnits: {
        name: "Destroyed units",
        description: "Number of units destroyed over time",
      },
      destroyedBuildings: {
        name: "Destroyed buildings",
        description: "Number of buldings destroyed over time",
      },
      militaryUnits: {
        name: "Military units",
        description: "Number of military units alive (army size)",
      },
      unitsValue: {
        name: "Units value",
        description: "Value [CR] of all alive military units",
      },
      avgUnitsValue: {
        name: "Avg units value",
        description: "Avg value [CR] of military units",
      },
      killsDeaths: {
        name: "K/D",
        description: "Destroyed to lost ratio of units",
      },
      killsDeathsFiveMin: {
        name: "K/D 5min",
        description: "Destroyed to lost ratio of units in timespan of previous 5 minutes",
      },
      unitsCaptured: {
        name: "Units captured",
        description: "Number of units captured",
      },
      unitsTransferred: {
        name: "Units received",
        description: "Number of units received from allies",
      },
      damageDealt: {
        name: "Damage dealt",
        description: "Total amount of damage given",
      },
      damageReceived: {
        name: "Damage received",
        description: "Total amount of damage received",
      },
      recentDamage: {
        name: "Recent damage",
        description: "Damage dealt within last 60 seconds",
      },
      commandsSent: {
        name: "Commands sent",
        description: "Total amount of commands sent by human players in a multiplayer game",
      },
      commandsSentPerMin: {
        name: "Commands per minute",
        description: "Average amount of commands sent per minute by human players in a multiplayer game",
      },
      commandsSentLastMin: {
        name: "Commands in last minute",
        description: "Total amount of commands sent by human players in a multiplayer game within last minute",
      },
      researchCenters: {
        name: "Research centers",
        description: "Total amount of operating (powered on and enabled) research centers",
      },
      buildingsUnderConstruction: {
        name: "Constructed buildings",
        description: "Total amount of buildings under construction. This includes currently dropped down LC buildings and queued LC buildings.",
      },
      activeMiningEntities: {
        name: "Active mining entities",
        description: "Number of active mining objects. For ED it is number of Taigas assigned to a non-exploited mine. For UCS it is number of working harvesters. For LC it is number of non-exploited mines.",
      },
      miningEfficiency: {
        name: "Mining efficiency",
        description: "Money flow per mining entity",
      },
    },
  },
  common: {
    shields: {
      noShield: "No shield",
      smallShield: "Small shield",
      mediumShield: "Medium shield",
      largeShield: "Large shield",
    },
  },
  objectNames: {
    chassis: {
      EDUBU1: "Gruz",
      EDUAS1: "MI 27 Boyar",
      EDUST: "TT Pamir",
      EDUST1: "TT 100 Pamir",
      EDUST2: "TT 110 Pamir",
      EDUST3: "TT 120 Pamir",
      EDUMW: "TK Caspian",
      EDUMW1: "TK 100 Caspian",
      EDUMW2: "TK 110 Caspian",
      EDUMW3: "TK 111 Caspian",
      EDUOH1: "ZK Taiga",
      EDUOH2: "ZK Taiga 2",
      EDUMT: "ZT Siberia",
      EDUMT1: "ZT 100 Siberia",
      EDUMT2: "ZT 101 Siberia",
      EDUMT3: "ZT 102 Siberia",
      EDUHT: "HT Kruszchev",
      EDUHT1: "HT 400 Kruszchev",
      EDUHT2: "HT 500 Kruszchev",
      EDUHT3: "HT 600 Kruszchev",
      EDUBT: "HT Ural",
      EDUBT1: "HT 800 Ural",
      EDUBT2: "HT 900 Ural",
      EDUHW: "TL Volga",
      EDUHW1: "TL 70 Volga",
      EDUHW2: "TL 80 Volga",
      EDUSS0: "ESS Irkutsk",
      EDUSS1: "ESS 30 Irkutsk",
      EDUSS2: "ESS 40 Irkutsk",
      EDUSS3: "ESS 80 Irkutsk",
      EDUBS1: "ESS 200 Leviathan",
      EDUBS2: "ESS 300 Leviathan",
      EDUSM1: "Kiev",
      EDUSM2: "Kiev II",
      EDUSPY: "NEO",
      EDUSPECIAL: "Russlia",
      EDUSTEALTH: "STEALTH",
      EDUFAKE1: "Fake Pamir",
      EDUFAKE2: "Fake Siberia",
      EDUFAKE3: "Fake Kruszchev",
      EDUA1: "MI Cossack",
      EDUA11: "MI 106 Cossack",
      EDUA12: "MI 107 Cossack",
      EDUA2: "MI Grozny",
      EDUA21: "MI 140 Grozny",
      EDUA22: "MI 150 Grozny",
      EDUA3: "MI Han",
      EDUA31: "MI 200 Han",
      EDUA32: "MI 210 Han",
      EDUA4: "MI Thor",
      EDUA41: "MI 300 Thor",
      EDUA42: "MI 310 Thor",
      EDUUT: "Unit transporter",
      EDUOB: "Scout",
      EDUOB2: "Scout II",
      EDUMI: "ZT Minelayer",
      EDUMI1: "ZT 200 Minelayer",
      EDUMI2: "ZT 210 Minelayer",
      EDUTO1: "MI 42 Lenin",
      EDUSS: "Space shuttle",
      EDUTA1: "Ukraine",

      UCSUBU1: "Mammoth",
      UCSUAS1: "Condor",
      UCSUOH1: "Harvester",
      UCSUOH2: "Harvester II",
      UCSUOH3: "Harvester III",
      UCSUAH: "Air Harvester",
      UCSUAH1: "Harvester IV",
      UCSUAH2: "Harvester V",
      UCSUAH3: "Harvester VI",
      UCSUSL1: "Tiger",
      UCSUSL2: "Tiger II",
      UCSUSL3: "Tiger III",
      UCSUML1: "Spider",
      UCSUML2: "Spider II",
      UCSUML3: "Spider III",
      UCSUSS1: "Shark",
      UCSUSS2: "Shark II",
      UCSUSS3: "Shark III",
      UCSUHL1: "Panther",
      UCSUHL2: "Panther II",
      UCSUHL3: "Panther III",
      UCSU4L1: "Grizzly",
      UCSU4L2: "Grizzly II",
      UCSU4L3: "Grizzly III",
      UCSUBL1: "Jaguar",
      UCSUBL2: "Jaguar II",
      UCSUCS: "Cargo Salamander",
      UCSUBS1: "Hydra",
      UCSUBS2: "Hydra II",
      UCSUBS3: "Hydra III",
      UCSUSM1: "Orca",
      UCSUSM2: "Orca II",
      UCSUA11: "Gargoyle",
      UCSUA12: "Gargoyle II",
      UCSUA13: "Gargoyle III",
      UCSUA21: "Bat",
      UCSUA22: "Bat II",
      UCSUA31: "Dragon",
      UCSUA32: "Dragon II",
      UCSUUT: "Unit Transporter",
      UCSUOB: "Scout",
      UCSUOB2: "Scout II",
      UCSUMI1: "Minelayer",
      UCSUMI2: "Minelayer II",
      UCSUTO1: "Ore Transporter",
      UCSUSS: "Space shuttle",
      UCSUTA1: "Albatross",

      LCUTD: 'Tunnel digger',
      LCUAS1: 'Mercury',
      LCULU: "Lunar",
      LCULU1: "Lunar m1",
      LCULU2: "Lunar m2",
      LCULU3: "Lunar m3",
      LCUMO: "Moon",
      LCUMO1: "Moon m1",
      LCUMO2: "Moon m2",
      LCUMO3: "Moon m3",
      LCUCR: "Crater",
      LCUCR1: "Crater m1",
      LCUCR2: "Crater m2",
      LCUCR3: "Crater m3",
      LCUCU: "Crusher",
      LCUCU1: "Crusher m1",
      LCUCU2: "Crusher m2",
      LCUCU3: "Crusher m3",
      LCUHT1: "Crion",
      LCUFG: "Fat Girl",
      LCUFG1: "Fat Girl c2",
      LCUFG2: "Fat Girl c3",
      LCUFG3: "Fat Girl c4",
      LCUNH: "New Hope",
      LCUHERO: "Fang",
      PROTOTYPE: "PROTOTYPE",
      LCUOB1: "Phobos",
      LCUOB2: "Phobos II",
      LCUME: "Meteor",
      LCUME1: "Meteor m1",
      LCUME2: "Meteor m2",
      LCUME3: "Meteor m3",
      LCUSF: "Super Fighter",
      LCUSF1: "Super Fighter m1",
      LCUSF2: "Super Fighter m2",
      LCUBO: "Thunderer",
      LCUBO1: "Thunderer m1",
      LCUBO2: "Thunderer m2",
      LCUUT: "Unit Transporter",
      LCUUFO: "Alien Craft",
      LCUBU: 'LC builder',
      LCUBU2: 'LC builder II',
      LCUBU3: 'LC builder III',
      LCUTO1: "Ore Transporter",
      LCUSS: "Space shuttle",
      LCUTA1: "Jupiter",
    },
    weapons: {
      short: {
        LCWCH: 'MG',
        LCWCH1: 'MG1',
        LCWCH2: 'MG2',
        LCAA: 'AAR',
        LCAAU: 'AAR',
        LCWSR: 'R',
        LCWSR1: "R1",
        LCWSR2: "R2",
        LCWSR3: "R3",
        LCWMR: 'hR',
        LCWMR1: "hR1",
        LCWMR2: "hR2",
        LCWMR3: "hR3",
        LCWAA1: "AAR",
        LCWSL: 'E',
        LCWSL1: "E1",
        LCWSL2: "E2",
        LCWSS: 'S',
        LCWSS1: "S1",
        LCWSS2: "S2",
        LCWHL: 'hE',
        LCWHL1: "hE1",
        LCWHL2: "hE2",
        LCWHS: 'hS',
        LCWHS1: "hS1",
        LCWHS2: "hS2",
        LCWHC1: "ART",
        LCWEQ: 'EQG',
        LCWEQ1: "EQG1",
        LCWEQ2: "EQG2",
        LCWNH: "P",
        LCWAC1: 'MG1',
        LCWAC2: 'MG2',
        LCWAR1: "R1",
        LCWAR2: "R2",
        LCWAMR1: "hR1",
        LCWAMR2: "hR2",
        LCWAS1: "hS1",
        LCWAS2: "hS2",
        LCWHERO: "P",
        LCWUFO: "UFO",
        LCWAN1: "An",

        EDWCH: 'MG',
        EDWCH1: 'MG1',
        EDWCH2: 'MG2',
        EDWAA1: "AA",
        EDWCA: 'C',
        EDWCA1: "C1",
        EDWCA2: "C2",
        EDWSR: 'R',
        EDWSR1AB: "R1",
        EDWSR2AB: "R2",
        EDWSR1: "R1",
        EDWSR2: "R2",
        EDWSR3: "R3",
        EDWSL: 'L',
        EDWSL1: "L1",
        EDWSL2: "L2",
        EDWSL3: "L3",
        EDWSI: 'I',
        EDWSI1: "I1",
        EDWSI2: "I2",
        EDWHC: 'hC',
        EDWHC1: "hC1",
        EDWHC2: "hC2",
        EDWHCShip1: "hC1",
        EDWHCShip2: "hC2",
        EDWMRShip1: "hR1",
        EDWMRShip2: "hR2",
        EDWMRShip3: "hR3",
        EDWARTShip: "ART",
        EDWHLShip1: "hL1",
        EDWHLShip2: "hL2",
        EDWHLShip3: "hL3",
        EDWHIShip1: "hI1",
        EDWHIShip2: "hI2",
        EDWMR: 'hR',
        EDWMR1: "hR1",
        EDWMR2: "hR2",
        EDWMR3: "hR3",
        EDWHR1: "BRL",
        EDWHL: 'hL',
        EDWHL1: "hL1",
        EDWHL2: "hL2",
        EDWHL3: "hL3",
        EDWHI: 'hI',
        EDWHI1: "hI1",
        EDWHI2: "hI2",
        EDWEQ: 'EQG',
        EDWEQ1: "EQG1",
        EDWEQ2: "EQG2",
        EDWAC1: 'MG1',
        EDWAC2: 'MG2',
        EDWAR1: "R1",
        EDWAR2: "R2",
        EDWAMR1: "hR1",
        EDWAMR2: "hR2",
        EDWAB: "B",
        EDWAB1: "B1",
        EDWAB2: "B2",
        EDWSHR1: "BRL1",
        EDWSHR2: "BRL2",
        EDWART: "ART",
        EDWAN1: "An",

        UCSWCH: "MG",
        UCSWTCH1: "MG1",
        UCSWTCH2: "MG2",
        UCSWSC: "C",
        UCSWTSC1: "C1",
        UCSWTSC2: "C2",
        UCSWSP: "P",
        UCSWTSP1: "P1",
        UCSWTSP2: "P2",
        UCSWSR: "R",
        UCSWTSR1: "R1",
        UCSWTSR2: "R2",
        UCSWTSR3: "R3",
        UCSWSG: "G",
        UCSWTSG1: "G1",
        UCSWTSG2: "G2",
        UCSWHC: "hC",
        UCSWBHC1: "hC1",
        UCSWBHC2: "hC2",
        UCSWMR: "hR",
        UCSWBMR1: "hR1",
        UCSWBMR2: "hR2",
        UCSWBMR3: "hR3",
        UCSWBSR1: "R1",
        UCSWBSR2: "R2",
        UCSWBSR3: "R3",
        UCSWHP: "hP",
        UCSWBHP1: "hP1",
        UCSWBHP2: "hP2",
        UCSWBHP3: "hP3",
        UCSWHG: "hG",
        UCSWBHG1: "hG1",
        UCSWBHG2: "hG2",
        UCSWEQ: "EQG",
        UCSWEQ1: "EQG1",
        UCSWEQ2: "EQG2",
        UCSWSCH1: 'MG1',
        UCSWSCH2: 'MG2',
        UCSWSSP1: "P1",
        UCSWSSP2: "P2",
        UCSWSSR1: "R1",
        UCSWSSR2: "R2",
        UCSWSSR3: "R3",
        UCSWSMR1: "hR1",
        UCSWSMR2: "hR2",
        UCSWDMR1: "hR1",
        UCSWDMR2: "hR2",
        UCSWDSR1: "R1",
        UCSWDSR2: "R2",
        UCSWDSR3: "R3",
        UCSWDHP1: "hP1",
        UCSWDHP2: "hP2",
        UCSWDHG1: "hG",
        UCSWACH1: 'MG1',
        UCSWACH2: 'MG2',
        UCSWASP1: "P1",
        UCSWASP2: "P2",
        UCSWASR1: "R1",
        UCSWASR2: "R2",
        UCSWAMR1: "hR1",
        UCSWAMR2: "hR2",
        UCSWAPB: "B",
        UCSWAPB1: "B1",
        UCSWAPB2: "B2",
        UCSWSHR: "MDW",
        UCSWSHR1: "MDW1",
        UCSWSHR2: "MDW2",
        UCSWAN1: "An",

        EDBANNER: "Ban",
        LCBANNER: "Ban",
        UCSBANNER: "Ban",
        EDRADAR: "RAD",
        EDRADAR1: "RAD1",
        EDRADAR2: "RAD2",
        EDRADAR3: "RAD3",
        EDSCREAMER: "NG",
        EDSCREAMER1: "NG1",
        EDSCREAMER2: "NG2",
        EDSCREAMER3: "NG3",
        UCSWSH: "SHA",
        UCSWSH1: "SHA1",
        UCSWSH2: "SHA2",
        UCSWSH3: "SHA3",
        UCSRADAR1: "RAD",
        LCSOB: "Detector",
        LCSOB1: "Detector1",
        LCSOB2: "Detector2",
        LCSOB3: "Detector3",
        LCSSHR: "Recharger",
        LCSSHR1: "Recharger1",
        LCSSHR2: "Recharger2",
        LCSSHR3: "Recharger3",
        LCSREG: "Regenerator",
        LCSREG1: "Regenerator1",
        LCSREG2: "Regenerator2",
        LCSREG3: "Regenerator3",
        UCSREPAIR: "Repairer",
        UCSREPAIR1: "Repairer1",
        UCSREPAIR2: "Repairer2",
        EDREPAIR: "Repairer",
        EDREPAIR1: "Repairer1",
        EDREPAIR2: "Repairer2",
        UCSSBC: "Grab",
        EDSBC: "Grab",
        LCSBC: "Grab",
        EDSCA1: "TRN",
        EDSACA1: "TRN",
        EDSUT: "",
        LCSUT: "",
        UCSSUT: "",
      },
      full: {
        LCWCH: 'MG 20mm',
        LCWCH1: 'MG 20mm',
        LCWCH2: 'Double MG 20mm',
        LCAA: 'AA Rocket Launcher',
        LCAAU: 'AA Rocket Launcher',
        LCWSR: "Rocket Launcher",
        LCWSR1: "Rocket Launcher",
        LCWSR2: "Rocket Launcher upg. 1",
        LCWSR3: "Rocket Launcher upg. 2",
        LCWMR: "Heavy Rocket Launcher",
        LCWMR1: "Heavy Rocket Launcher",
        LCWMR2: "Heavy Rocket Launcher upg. 1",
        LCWMR3: "Heavy Rocket Launcher upg. 2",
        LCWAA1: 'AA Rocket Launcher',
        LCWSL: 'Electro-Cannon',
        LCWSL1: "Electro-Cannon",
        LCWSL2: "Electro-Cannon upg. 1",
        LCWSS: 'Sonic Cannon',
        LCWSS1: "Sonic Cannon",
        LCWSS2: "Sonic Cannon upg. 1",
        LCWHL: 'Heavy Electro-Cannon',
        LCWHL1: "Heavy Electro-Cannon",
        LCWHL2: "Heavy Electro-Cannon upg. 1",
        LCWHS: 'Heavy Sonic Cannon',
        LCWHS1: "Heavy Sonic Cannon",
        LCWHS2: "Heavy Sonic Cannon upg. 1",
        LCWHC1: "Plasma Artillery",
        LCWEQ: "Earthquake gen.",
        LCWEQ1: "Earthquake gen.",
        LCWEQ2: "Earthquake gen. upg. 1",
        LCWNH: "Plasma Beam",
        LCWAC1: 'MG 20mm',
        LCWAC2: 'Double MG 20mm',
        LCWAR1: "Rocket Launcher",
        LCWAR2: "Rocket Launcher upg. 1",
        LCWAMR1: "Heavy Rocket Launcher",
        LCWAMR2: "Heavy Rocket Launcher upg. 1",
        LCWAS1: "Heavy Sonic Cannon",
        LCWAS2: "Heavy Sonic Cannon upg. 1",
        LCWHERO: "Plasma Beam",
        LCWUFO: "Alien Weapon",
        LCWAN1: "Animissile",

        EDWCH: 'MG 20mm',
        EDWCH1: 'MG 20mm',
        EDWCH2: 'MG 20mm upg. 1',
        EDWAA1: "AA Gun",
        EDWCA: "105 mm Cannon",
        EDWCA1: "105 mm Cannon",
        EDWCA2: "105 mm Double Cannon",
        EDWSR: "Rocket Launcher",
        EDWSR1AB: "Rocket Launcher",
        EDWSR2AB: "Rocket Launcher upg. 1",
        EDWSR1: "Rocket Launcher",
        EDWSR2: "Rocket Launcher upg. 1",
        EDWSR3: "Rocket Launcher upg. 2",
        EDWSL: "Laser Cannon",
        EDWSL1: "Laser Cannon",
        EDWSL2: "Laser Cannon upg. 1",
        EDWSL3: "Laser Cannon upg. 2",
        EDWSI: "Ion Cannon",
        EDWSI1: "Ion Cannon",
        EDWSI2: "Ion Cannon upg. 1",
        EDWHC: "120 mm Cannon",
        EDWHC1: "120 mm Cannon",
        EDWHC2: "120 mm Double Cannon",
        EDWHCShip1: "120 mm Cannon",
        EDWHCShip2: "120 mm Double Cannon",
        EDWMRShip1: "Heavy Rocket Launcher",
        EDWMRShip2: "Heavy Rocket Launcher upg. 1",
        EDWMRShip3: "Heavy Rocket Launcher upg. 2",
        EDWARTShip: "Artillery",
        EDWHLShip1: "Heavy Laser Cannon",
        EDWHLShip2: "Heavy Laser Cannon upg. 1",
        EDWHLShip3: "Heavy Laser Cannon upg. 2",
        EDWHIShip1: "Heavy Ion Cannon",
        EDWHIShip2: "Heavy Ion Cannon upg. 1",
        EDWMR: "Heavy Rocket Launcher",
        EDWMR1: "Heavy Rocket Launcher",
        EDWMR2: "Heavy Rocket Launcher upg. 1",
        EDWMR3: "Heavy Rocket Launcher upg. 2",
        EDWHR1: "Ballistic Rocket Launcher",
        EDWHL: "Heavy Laser Cannon",
        EDWHL1: "Heavy Laser Cannon",
        EDWHL2: "Heavy Laser Cannon upg. 1",
        EDWHL3: "Heavy Laser Cannon upg. 2",
        EDWHI: "Heavy Ion Cannon",
        EDWHI1: "Heavy Ion Cannon",
        EDWHI2: "Heavy Ion Cannon upg. 1",
        EDWEQ: "Earthquake gen.",
        EDWEQ1: "Earthquake gen.",
        EDWEQ2: "Earthquake gen. upg. 1",
        EDWAC1: 'MG 20mm',
        EDWAC2: 'MG 20mm upg. 1',
        EDWAR1: "Rocket Launcher",
        EDWAR2: "Rocket Launcher upg. 1",
        EDWAMR1: "Heavy Rocket Launcher",
        EDWAMR2: "Heavy Rocket Launcher upg. 1",
        EDWAB: "Bomb Bay",
        EDWAB1: "Bomb Bay (3 bombs)",
        EDWAB2: "Bomb Bay (5 bombs)",
        EDWSHR: "Nuclear warheads",
        EDWSHR1: "Nuclear warheads",
        EDWSHR2: "Nuclear warheads upg. 1",
        EDWART: "Artillery",
        EDWAN1: "Animissile",

        UCSWCH: 'MG 20mm',
        UCSWTCH1: 'MG 20mm',
        UCSWTCH2: 'MG 20mm upg. 1',
        UCSWSC: "105 mm Cannon",
        UCSWTSC1: "105 mm Cannon",
        UCSWTSC2: "105 mm Double Cannon",
        UCSWSP: "Plasma Cannon",
        UCSWTSP1: "Plasma Cannon",
        UCSWTSP2: "Plasma Cannon upg. 1",
        UCSWSR: "Rocket Launcher",
        UCSWTSR1: "Rocket Launcher",
        UCSWTSR2: "Rocket Launcher upg. 1",
        UCSWTSR3: "Rocket Launcher upg. 2",
        UCSWSG: "Grenade Launcher",
        UCSWTSG1: "Grenade Launcher",
        UCSWTSG2: "Grenade Launcher upg. 1",
        UCSWHC: "Heavy Cannon",
        UCSWBHC1: "Double Cannon 120mm",
        UCSWBHC2: "Quad Cannon 120mm",
        UCSWMR: "Heavy Rocket Launcher",
        UCSWBMR1: "Heavy Rocket Launcher",
        UCSWBMR2: "Heavy Rocket Launcher upg. 1",
        UCSWBMR3: "Heavy Rocket Launcher upg. 2",
        UCSWBSR1: "Rocket Launcher",
        UCSWBSR2: "Rocket Launcher upg. 1",
        UCSWBSR3: "Rocket Launcher upg. 2",
        UCSWHP: "Heavy Plasma Cannon",
        UCSWBHP1: "Heavy Plasma Cannon",
        UCSWBHP2: "Heavy Plasma Cannon upg. 1",
        UCSWBHP3: "Heavy Plasma Cannon upg. 2",
        UCSWHG: "Heavy Grenade Launcher",
        UCSWBHG1: "Heavy Grenade Launcher",
        UCSWBHG2: "Heavy Grenade Launcher upg. 1",
        UCSWEQ: "Earthquake gen.",
        UCSWEQ1: "Earthquake gen.",
        UCSWEQ2: "Earthquake gen. upg. 1",
        UCSWSCH1: 'MG 20mm',
        UCSWSCH2: 'MG 20mm upg. 1',
        UCSWSSP1: "Plasma Cannon",
        UCSWSSP2: "Plasma Cannon upg. 1",
        UCSWSSR1: "Rocket Launcher",
        UCSWSSR2: "Rocket Launcher upg. 1",
        UCSWSSR3: "Rocket Launcher upg. 2",
        UCSWSMR1: "Heavy Rocket Launcher",
        UCSWSMR2: "Heavy Rocket Launcher upg. 1",
        UCSWDMR1: "Heavy Rocket Launcher",
        UCSWDMR2: "Heavy Rocket Launcher upg. 1",
        UCSWDSR1: "Rocket Launcher",
        UCSWDSR2: "Rocket Launcher upg. 1",
        UCSWDSR3: "Rocket Launcher upg. 2",
        UCSWDHP1: "Heavy Plasma Cannon",
        UCSWDHP2: "Heavy Plasma Cannon upg. 1",
        UCSWDHG1: "Heavy Grenade Launcher",
        UCSWACH1: 'MG 20mm',
        UCSWACH2: 'MG 20mm upg. 1',
        UCSWASP1: "Plasma Cannon",
        UCSWASP2: "Plasma Cannon upg. 1",
        UCSWASR1: "Rocket Launcher",
        UCSWASR2: "Rocket Launcher upg. 1",
        UCSWAMR1: "Heavy Rocket Launcher",
        UCSWAMR2: "Heavy Rocket Launcher upg. 1",
        UCSWAPB: "Bomb Bay",
        UCSWAPB1: "Bomb Bay",
        UCSWAPB2: "Bomb Bay upg. 1",
        UCSWSHR: "Plasma Warheads",
        UCSWSHR1: "Plasma Warheads",
        UCSWSHR2: "Plasma Warheads upg. 1",
        UCSWAN1: "Animissile",

        EDBANNER: "Banner",
        LCBANNER: "Banner",
        UCSBANNER: "Banner",
        EDRADAR: "Radar",
        EDRADAR1: "Radar",
        EDRADAR2: "Radar upg. 1",
        EDRADAR3: "Radar upg. 2",
        EDSCREAMER: "Noise Generator",
        EDSCREAMER1: "Noise Generator",
        EDSCREAMER2: "Noise Generator upg. 1",
        EDSCREAMER3: "Noise Generator upg. 2",
        UCSWSH: "Shadow Generator",
        UCSWSH1: "Shadow Generator",
        UCSWSH2: "Shadow Generator upg. 1",
        UCSWSH3: "Shadow Generator upg. 2",
        UCSRADAR1: "Radar",
        LCSOB: "Detector",
        LCSOB1: "Detector m1",
        LCSOB2: "Detector m2",
        LCSOB3: "Detector m3",
        LCSSHR: "Shield Recharger",
        LCSSHR1: "Shield Recharger m1",
        LCSSHR2: "Shield Recharger m2",
        LCSSHR3: "Shield Recharger m3",
        LCSREG: "Regenerator",
        LCSREG1: "Regenerator m1",
        LCSREG2: "Regenerator m2",
        LCSREG3: "Regenerator m3",
        UCSREPAIR: "Repairer",
        UCSREPAIR1: "Repairer",
        UCSREPAIR2: "Repairer upg. 1",
        EDREPAIR: "Repairer",
        EDREPAIR1: "Repairer",
        EDREPAIR2: "Repairer upg. 1",
        UCSSBC: "Building Grabber",
        EDSBC: "Building Grabber",
        LCSBC: "Building Grabber",
        EDSCA1: "Container Transporter",
        EDSACA1: "Container Hook",
        EDSUT: "Transport Hook",
        LCSUT: "Transport Hook",
        UCSSUT: "Transport Hook",
      },
    },
    ammo: {
      MIS_SR1: "ED Small rocket",
      MIS_SR2: "ED Small rocket (guided 25%)",
      MIS_SR3: "ED Small rocket (guided 50%)",
      MIS_SR4: "ED Small rocket (guided 100%)",
      MIS_UCS_SR1: "UCS Small rocket",
      MIS_UCS_SR2: "UCS Small rocket (guided 25%)",
      MIS_UCS_SR3: "UCS Small rocket (guided 50%)",
      MIS_UCS_SR4: "UCS Small rocket (guided 100%)",
      MIS_LC_SR1: "LC Small rocket",
      MIS_LC_SR2: "LC Small rocket (guided 25%)",
      MIS_LC_SR3: "LC Small rocket (guided 50%)",
      MIS_LC_SR4: "LC Small rocket (guided 100%)",
      MIS_MR1: "ED Heavy rocket",
      MIS_MR2: "ED Heavy rocket (guided 25%)",
      MIS_MR3: "ED Heavy rocket (guided 50%)",
      MIS_MR4: "ED Heavy rocket (guided 100%)",
      MIS_UCS_MR1: "UCS Heavy rocket",
      MIS_UCS_MR2: "UCS Heavy rocket (guided 25%)",
      MIS_UCS_MR3: "UCS Heavy rocket (guided 50%)",
      MIS_UCS_MR4: "UCS Heavy rocket (guided 100%)",
      MIS_LC_MR1: "LC Heavy rocket",
      MIS_LC_MR2: "LC Heavy rocket (guided 25%)",
      MIS_LC_MR3: "LC Heavy rocket (guided 50%)",
      MIS_LC_MR4: "LC Heavy rocket (guided 100%)",
      MIS_HR1: "ED Ballistic rocket",
      MIS_HR2: "ED Ballistic rocket (upg. 1)",
      MIS_HR3: "ED Ballistic rocket (upg. 2)",
      MIS_HR4: "ED Nuclear Rocket",
      MIS_RANTI: "Antirocket",
      MIS_LCHC: "Plasma artillery",
      MIS_CH1: "20 mm bullet",
      MIS_CH2: "20 mm bullet (upg. 1)",
      MIS_CH3: "20 mm bullet (upg. 2)",
      MIS_CH4: "20 mm bullet (upg. 3)",
      MIS_SC1: "ED 105 mm bullet",
      MIS_SC2: "ED 105 mm bullet (upg. 1)",
      MIS_SC3: "ED 105 mm bullet (upg. 2)",
      MIS_SC4: "ED 105 mm bullet (upg. 3)",
      MIS_HC1: "ED 120 mm bullet",
      MIS_HC2: "ED 120 mm bullet (upg. 1)",
      MIS_HC3: "ED 120 mm bullet (upg. 2)",
      MIS_HC4: "ED 120 mm bullet (upg. 3)",
      MIS_BOMB1: "Bomb",
      MIS_BOMB2: "Bomb (upg. 1)",
      MIS_BOMB3: "Bomb (upg. 2)",
      MIS_BOMB4: "Nuclear bomb",
      MIS_SL1: "Small laser",
      MIS_SL2: "Small laser (upg. 1)",
      MIS_SL3: "Small laser (upg. 2)",
      MIS_HL1: "Heavy laser",
      MIS_HL2: "Heavy laser (upg. 1)",
      MIS_HL3: "Heavy laser (upg. 2)",
      MIS_SI: "Ion Blast",
      MIS_HI: "Heavy Ion Blast",
      MIS_EDG1: "Mobile Artillery Shell",
      MIS_SP: "Plasma",
      MIS_HP: "Heavy plasma",
      MIS_HPG: "Heavy plasma (building)",
      MIS_BP1: "Heavy plasma (Grizzly)",
      MIS_PCP: "Stationary plasma",
      MIS_G1: "Small grenade",
      MIS_G2: "Small grenade (upg. 1)",
      MIS_G3: "Small grenade (upg. 2)",
      MIS_G4: "Small grenade (upg. 3)",
      MIS_HG1: "Heavy grenade",
      MIS_HG2: "Heavy grenade (upg. 1)",
      MIS_HG3: "Heavy grenade (upg. 2)",
      MIS_HG4: "Heavy grenade (upg. 3)",
      MIS_PLBOMB1: "Plasma bomb",
      MIS_PLBOMB2: "Plasma bomb (upg. 1)",
      MIS_PLBOMB3: "Plasma bomb (upg. 2)",
      MIS_PLBOMB4: "Plasma bomb (upg. 3)",
      MIS_SE: "Electric Bolt",
      MIS_SE2: "Electric Bolt (upg.)",
      MIS_HE: "Heavy Electric Bolt",
      MIS_HE2: "Heavy Electric Bolt (upg.)",
      MIS_HERO: "Plasma Beam",
      MIS_SS: "Sonic Blast",
      MIS_HS: "Heavy Sonic Blast",
      MIS_HSA: "Air Heavy Sonic Blast",
      MIS_UFO: "Energy Blast",
      MIS_METEORZK: "Meteor",
      MIS_SDI: "SDI Laser",
      WEATHER_LIGHTNING: "Lightning (weather)",
      WEATHER_LIGHTNING_FIRST: "Lightning 1 (weather)",
      WEATHER_LIGHTNING2: "Lightning 2 (weather)",
      WEATHER_LIGHTNING3: "Lightning 3 (weather)",
      WEATHER_LIGHTNING4: "Lightning 4 (weather)",
      WEATHER_LIGHTNING5: "Lightning 5 (weather)",
      WEATHER_METEOR: "Meteor (weather)",
      WEATHER_METEOR_FIRST: "Meteor 1 (weather)",
      WEATHER_METEOR2: "Meteor 2 (weather)",
      WEATHER_METEOR3: "Meteor 3 (weather)",
      WEATHER_METEOR4: "Meteor 4 (weather)",
      WEATHER_METEOR5: "Meteor 5 (weather)",
      MIS_UCSSC1: "UCS 105 mm bullet",
      MIS_UCSSC2: "UCS 105 mm bullet (upg. 1)",
      MIS_UCSSC3: "UCS 105 mm bullet (upg. 2)",
      MIS_UCSSC4: "UCS 105 mm bullet (upg. 3)",
      MIS_UCSHC1: "UCS 120 mm bullet",
      MIS_UCSHC2: "UCS 120 mm bullet (upg. 1)",
      MIS_UCSHC3: "UCS 120 mm bullet (upg. 2)",
      MIS_UCSHC4: "UCS 120 mm bullet (upg. 3)",
      MIS_UCSART: "UCS Artillery",
      MIS_EDART: "ED Artillery",
      MIS_LCART: "LC Artillery",
      MIS_EDEQ1: "ED Earthquake",
      MIS_EDEQ2: "ED Earthquake (upg.)",
      MIS_UCSEQ1: "UCS Earthquake",
      MIS_UCSEQ2: "UCS Earthquake (upg.)",
      MIS_LCEQ1: "LC Earthquake",
      MIS_LCEQ2: "LC Earthquake (upg.)",
      MIS_AAR1: "Anti-Air rocket",
      MIS_AAR2: "Anti-Air rocket (guided 25%)",
      MIS_AAR3: "Anti-Air rocket (guided 50%)",
      MIS_AAR4: "Anti-Air rocket (guided 100%)",
      MIS_AAP: "Anti-Air plasma",
      MIS_AA1: "Anti-Air bullet",
      MIS_AA2: "Anti-Air bullet (upg. 1)",
      MIS_AA3: "Anti-Air bullet (upg. 2)",
      MIS_AA4: "Anti-Air bullet (upg. 3)",
      MIS_NUCLEAR1: "Submarine nuclear rocket",
      MIS_NUCLEAR2: "Submarine nuclear rocket (upg.)",
      MIS_PLASMAROC1: "Submarine plasma",
      MIS_PLASMAROC2: "Submarine plasma (upg.)",
    },
  },
  unitStats: {
    summary: {
      title: "Summary",
      totalDamageDealt: "Total damage dealt",
      damageToUnits: "vs units",
      damageToBuildings: "vs buildings",
      totalKills: "Total kills",
      unitsKilled: "units",
      buildingsKilled: "buildings",
      totalDamageTaken: "Total damage taken",
      damageFromUnits: "from units",
      damageFromBuildings: "from buildings",
      totalDeaths: "Times killed",
      killedByUnits: "by units",
      killedByBuildings: "by buildings",
      totalKillsDeaths: "Total K/D",
      totalDamageRatio: "Damage ratio",
    },
    combatTable: {
      title: "Combat stats vs units",
      groupChassis: "Group chassis",
      groupWeapons: "Group weapons",
      groupShields: "Group shields",
      headers: {
        player: "Player",
        unit: "Unit",
        damageDealt: "Damage dealt",
        kills: "Kills",
        damageTaken: "Damage taken",
        killedBy: "Killed by",
        damageRatio: "Dmg ratio",
        killsDeaths: "K/D",
      },
    },
    ammoTable: {
      title: "Damage taken by ammo",
      groupAmmo: "Group ammo",
      headers: {
        ammo: "Ammo name",
        damageTaken: "Damage taken",
        killedBy: "Killed by",
      },
    },
    playerStats: {
      title: "Unit stats",
      groupChassis: "Group chassis",
      groupWeapons: "Group weapons",
      groupShields: "Group shields",
    },
    weaponsTable: {
      title: "Weapon stats",
      headers: {
        slot: "Slot",
        weapon: "Name",
        damageDealt: "Damage dealt to units",
        kills: "Units killed",
        buildingDamage: "Damage dealt to buildings",
        buildingsKilled: "Buildings destroyed",
      },
    },
  },
};