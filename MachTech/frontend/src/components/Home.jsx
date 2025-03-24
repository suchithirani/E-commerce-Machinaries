import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Truck, Shield, Zap, Heart, Star, Send, Menu, X, Search, MapPin, ChevronDown, ChevronRight } from 'lucide-react';

const MachineryHomepage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [visibleLogos, setVisibleLogos] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Categories for the sidebar
  const categories = [
    { label: 'Single Drum Soil Compactor', link: '#' },
    { label: 'Pick and Carry Crane', link: '#' },
    { label: 'Crawler Excavator', link: '#' },
    { label: 'Crawler Crane', link: '#' },
    { label: 'Backhoe Loader', link: '#' },
    { label: 'Mini Excavators', link: '#' },
    { label: 'Hand Stacker', link: '#' },
    { label: 'Site Dumper', link: '#' },
    { label: 'Automatic Stirrup Bender', link: '#' },
    { label: 'Low Profile Pallet Truck', link: '#' },
  ];

  // Navigation menu items
  const navItems = [
    { label: 'Buy', hasDropdown: true, link: '#' },
    { label: 'Sell', hasDropdown: true, link: '#' },
    { label: 'Rent', hasDropdown: false, link: '#' },
    { label: 'Service', hasDropdown: false, link: '#' },
    { label: 'Hire an Operator', hasDropdown: false, link: '#' },
  ];

  // Company logos with links - Using placeholder images for demonstration
  const companyLogos = [
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaIzRa9lLV6kzhDym9CAne6E6a_3RvGGkeTkZS2aMfzHlhmTnXnZXwdZm8RJPGnJ0m0A&usqp=CAU",
      alt: "Tata Hitachi",
      url: "https://www.tatahitachi.co.in/"
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3nHED8SJco3BHg4N1bFrtKqchUnwdUNEWLRj7QaejGjFBZBG_RFJTVnuCO-DKU4rWeKM&usqp=CAU",
      alt: "Caterpillar",
      url: "https://www.caterpillar.com/"
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZC30J0aU5wvrLWYzp8StFD4WxE_8x3ljG_hnY6ZnXacLxt6bg9mLTlCGqPUwjyQoqztc&usqp=CAU",
      alt: "Komatsu",
      url: "https://www.komatsu.com/"
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuQs7N1Eo9hXj1oQcMpJ0YE3zy3kgXF2MlTxLTrQmVymG7ahoPSYbBqOjcunxqSFWldg&usqp=CAU",
      alt: "Volvo Construction Equipment",
      url: "https://www.volvoce.com/"
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPO1SuNLrEWuQbV5EnKsShqvw4T4A4UwIXDL5UUEJv5Te_1ZkSzKnQB-uGyXENVrwkFM&usqp=CAU",
      alt: "JCB",
      url: "https://www.jcb.com/"
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmJv5goAhBIjS9CPEYQISkcOavfxDKQkBV-D4_j3v7c8O62Pm7rBgLRjIRzHlcf-QIaMw&usqp=CAU",
      alt: "ACE",
      url: "https://www.ace-cranes.com/"
    }
  ];

  // Customer feedback data
  const customerFeedback = [
    {
      id: 1,
      name: "Vijay Agarwal",
      company: "Action Construction Equipment Ltd.",
      rating: 5,
      comment: "MachinePro has been our trusted supplier for over 5 years. Their equipment reliability and after-sales service is unmatched in the industry.",
      image: "https://static.wixstatic.com/media/4c8d09_769dcca9c16d48c7b6798c32588bbbd0~mv2.jpg/v1/fill/w_502,h_416,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/4c8d09_769dcca9c16d48c7b6798c32588bbbd0~mv2.jpg"
    },
    {
      id: 2,
      name: "Sandeep Singh",
      company: "Tata Hitachi Construction Machinery",
     rating: 5,
      comment: "The on-site servicing team from MachinePro saved us thousands in downtime costs. Their technicians are prompt, knowledgeable and professional.",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMREBUSEhIVFhUXFxYVFhYVFRUXFRUVFhUWFxUVFxUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGislICUwLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAGAAEDBAUCB//EAEYQAAEDAQUEBwQHBgUDBQAAAAEAAgMRBAUSITEGQVFhEyIycYGRoRRSsdEjQmJygsHwBzM0U5LhFRYkQ6KTsvFzg6PC0v/EABoBAAIDAQEAAAAAAAAAAAAAAAIDAAEEBQb/xAAuEQACAgEEAQQABAYDAAAAAAAAAQIRAwQSITFBExQiUQUyYdFCcZGhsfEjM4H/2gAMAwEAAhEDEQA/AGZGSac6IqsV1kR1KwbvbV+feiC03ngZQa0QzipICb5M+29VD15vq5aE73PNSsm1HrLMse1l4vzE10/vQt+26DvQ/df70IgtvZTl0aH2GMgrd5/9M/BAT7NXJH8P8B+A/BBMjqu6qHKmZpEDIywUrku45F3I3JcMbkgS+ykrR1HayFbZfBd1SB3rOEdSpJLPQZIfUa4TGYZRjy0aUF44dBruU8DHyOL3ZcuSyrPZqZlagtnVoPNCocGv3MZvnopuGvildkhANOK63E96o2O9IQSOlZr7w/RT8i+JmnFyT2qzdZaiM1LFb3SdU7kMW7aWMZNBfzGTfM5+iwHbRWkEljwyu5rWn1cCVUai7GYfw/PJ21S/U9KwpqLzP/GrQHYunkrzdUf06ei0rBtjMwgShsjd5phf4EZHup4pqyI1T/DssVw0w5ISCisVrZNGJIzVp8wd4I3FTBMMLTXDGK5g3rormDUqeSiVMnKZEQSZOmULEmSSVEEmTplCxJk6ZQoSSSShYHNtOF2SsMtNTmoJYQCnERGdES6MbbbLVqeMOSxLSM1t2ezufoFVvmxllKpDS6G438rKN2n6VqIbb2UPXePpQt+2u6qpGl9htZs7B/7Z+CwbuiY1lXUrvqt+7M7CPuH4IdewV5JWa7QWL4pzqypK0OcaaKq9tDRXZwK5KlOKlVTfAE9qhfkdgCtNZULPkcWqzDaMkMY82Y3J1RFNKa0ViKKoyXMlKFPZJKZnQAnwTU6IlYPbU3if4dh5yePZb+Z8OaH2ZJSTF7nPOriXeZqmCCUrZ63TYligondUznJBV2yVfQbtVQ+U6pfZO4qNxUhaf0VC896oGRpXHfT7NJibm09tm5w4jg4bivS7HaWSxtkjNWuFQfiDwI4Lx5xRRsFeeCYwk9WSpaODwK+oB8gnY5eDmazCpreu1/dB65cwalduUcOpWg5JMUyRTKyCSSSULGSSSVEEmSSUIJMkkoQZOmTqFgnZAMfW4oils7XMoELfWW3Z5XNaK6KTMRo2JojbUhYG0dqDyANy3JJgWIZvZlEpdh438qKVidSUURBbGVYh2x/vG96KJuwojWwvugf6AfcPwQlanlFtz/wI+6UEWiWqVlk00LfXAumyVfpzVXLPGCM1F7OK5IU15ENtsgtBJCrteQr8pFM1UIFUxVXAvItsi1YhjB4rq8ozHZ5XHI9G4eJFB8U1lOE5LnaGUmyyj7PwcCfQLPPiZ0cMotxXkAwV2FAxylYUR6KMjRuu6JbW8xwgVAq5zjRrRoKkA565ciiKy/s6eNbQ0H7MZdXvJcK+SJdlbr9ns7W06zus88XHd3AZLaAUjNrhGHPLfPd9dHlm0Oz0lkNT14zpI0UFeDh9U+iwJCvarbhwkPIociHUoRwoV5ftJc7WF0lncHMHaaDUs+bfh3aRWPjqbVS7Bx9N/mPzVq6H4bRERukjPeMYrTwVMnySsmLG1re1ibg7y4ADzKNC5yR7U9cQ6ldSLmPUrUcMlKZIpkRB0yZOoQSZJJUWJMkUlCCSTJKEHSTJKiAU6odVa0doEjKb1bfY2ludFJYLA3VA8ioyRZn2Uu0cql9DRb1siAWDfTdFSlbskFUjLsvbHeimQ9RCkHbHeil56ngojawvuM1sP4SgaRHOzQrYh3FCtosudEM0nQp8clGIrkT0dlorstjw5qlaIaZhZ3F2U8kacSZzsSqhua4ZJTVW7M0O3pykkuRKwOfMWNSgUUrDKx7Nzmub5ghWHw+S0YSwUokOcW+TVgxuKbb6PJ3tLSWkUIJBHAjI+q2NnLN0k7dC1nXI3nDm0U1pWmei0dr7oqXTsGh+kHL3x+fnxU37Pof3jnAjEWtB7gSR6hHLhHYhm3wtEtsneXYunmq51AGNFGnc2pyqiK4bZJmxxc5wr2qAmmtT4cFZN2UyaMia5GgU9lswZJzp8dUDlaAUaBi98T5yHYjqBVxa3LcQ078vNVbCxzSD0LWnOuHrEbs619CiK2WdvS1dv46Z/Aqw2yBoJIHl/wCFalxRNiuzzPae7hDIC0Ua8E0GgPAcBmPVWdhLu6W09IezEA4/fNQweYJ8ER3xd4tIMeVdWHg4aeG7xWtcF0NskAjaanV7qUxOOppuG4BOxc8iM+TbHb5NB65j7RTnVNH2in+TASFMnKZGQSSZJUQdMkkoWIpkikoQSZJJQgk6ZJUQwvaamlVp3bIdFz/l44cQKmu2AsNDuWebpdGKMHfJHeMW9D98DIIrvPRC99NIaFWGd8MbFfIxYz1x3ooJ+j8EKsPXHein/b8Ew0hjsqf9EPxfErClOVVtbIn/AEX9XxKxGdYFVLozZnTKU8+IUWdPMW9y7tAIeRuUghBGagltV+pTHWzTOcWq5FZQFaZA1wolySLWXikZ8VpIGalsTi4pzFgdnotKBrcqJUoxTChOS5IMOoPqnuixsZBSPLDI7LhippyXU3aNFWu28I2PLcbak4aVrrlnRaK3Ro3YpuNMJ7I7I8vis+2SSRyYmAOrXEDroKAGtAAp7RaRGwnTw08N5WY68wWGgOeLrEUzPM880r00uzb6rfEUImWV4c4NaDTqZHnmVfo7CW7t1dR5rCjnkZkJMRJyqNK8wrXtM5eGyBor9Yb6f2RbIsqc5wfg6isxa6p13eK1KrJttt6LCXHKoHnv57kmbR2Umhma0/bq31IonwjS4MeWe6Vs1E0YzTscCAQQQcwRmCORSZ2kQs7KZdFMiIcpJ0lCDJJJlCxJkklCCTJJKEEkmSUIFsUYDFh2h7RIQo2Xm4iix7dayHVOqzz+T4EXfCJ7xkFVi3/KDGKcVZLXSFUL7hwsHemQx0rY2orvswmdod6KGfu/BC8Y6wRNF+78EPkYF+xmdjPe74lYTzhr4rc2IP8ApD953xWZaXMJIrvKvwJnj3FJllD+sVxIWMOq0QGgaqF9lY9DRknGjKmjc/NqpzSiHN7wzvOZ7hqVqX9afZLM57e0aNZycd/gAT4LzJ7y7rOJc45kk1JrzKbix70EoWFVp2nhG5zjyFB65+irt2uIHVhA4Yn18aAIcaAuJSm+hD6GqKRavK+Zp64nnD7req3xA18aqW4pSBSmpyNA0iuWWeZ3+Kz4G5KaN5aajl6InBVSGJnrdgtPSwsLxnTzpVp+C0PYm4Qafomqx9hwJrvbiyLXyAEajrkingQrn+J9GS2QGo9RpiCzTjRojb6JZ7I0kCmmap2+QAtaBUjdzSFsfK49HU+GQHMrTs9gbGMb83aucdw5cArhGypOjzva620mwVzYACBuJFaU36jyQta5A4uy1J7h3cM6nxU15WrpZXy++4u7sRqB4DJVVpUaM0nZc2a2hksj6AlzN8ZPVNd4908wjexba2dx+ka+PnTEP+OfovMYG4nlyvBqpRTJbR6d/myx1p0//wAc3/4WlZLdFMKxSMf91wJHeNQvIU3x+CnpoLcz2YhNReW2HaW0wEUlLwPqSdYEcKnMeBRxZtrLK8Crywn32kAcsWiBxaCUkzaTLmCdkjcTHtcOLSCPRdlCWclcrorkqFjJJJioQSSZJUQzILa5pITCIvfU6K0y6Za5s9QtJtgcKdVFDFQDcYqkcx2cBoWHtRFSMHmigwOwjJD22EbhBmN4+KbJcClzIEIu0ESQn6PwQ9Yo6uRDA3qLI0agt2H/AIV33nIVnJxu+8fiUU7C/wAO8faKw7Zdc2NxEZPWNNOPejjdcCplQTDeVoWF41WTLc1pJr0TvT5rTu+7pm6xn0Q5Iyrozsxf2jvPs8XAucfEMy+JQK3Qdy2trr49olDWn6JlWCmhc7V/wA5DmsYLRp4uMEmMj0OonhSVXB1TgjiF5BwkV4HlwKlonolvVFnqOwM7Ibu6SR2FofISfECgG88lkXxtcyY9SEYPee4h/hh7PqrGylnx2NrHZtMczgN2IS0r5FDW0tnEM72sGTi1zWjXrtBIH4iVly8G/RQhKVSDjZnaqyuDYXAQPrSjjVrnaZP4n7VOSubb2ro7DMd7m9GPxnCfQlY2zmybI48UzQ6R1K1zDB7o4nif0a37RCIrPDA0mhcXUJrQNBAHdV3ojxpqrE6jZuew88cE1KZqUrgszrr+SeZKOIYwAct5PmpEsSRUJRySmTq7Bc9okFY4XuyqKDdxzQyko9sOOOUvyqzMJqVYY7IfreqLTU03DX5Ky05Cmip9A0WrPM6N2ONzmO95hofHc4cijTZ7a3G5sVooHHJsgya47muH1SfI8kCsKkc2oohqy1aPYHBckIVuXa5gs7BOTjbVpIFcWHQ99KK2dr7Pxd/SUA03UxWCdr7P9r+kqxd20MU8nRsrWhOYpoqJRqpJ6plCjSDn/wAw+Tfkob4tjoIw8PqK0diAoK6ZiilBXNus3TQSRH6zTTvpkUKySDeKJiHaj7bVQve+RMzC57ackE9K4EgtzBoRwIyIT+0H3VnepyfoaVo4BHZZImntDzVqO8YwKYh5oSFoPupxaD7qW8839BLTQR6Bs3frIQ4dI0VNcyFffti33mea8xFoPuroSn3Va1M19FPSwZ6V/nFvFnmhzbLbF8kQihkLTirIYyQSwDNmIca1IHCmhzFpbUQKUAPwWfKPP9eq3YHkkt0jFmhji6icTnDn9XQ92/5qWAkg11BPjzHI6qASbiuLsNHPbwonXyKLhCif8vip3KGUZHuKIh3vTHVbuzmz/tcMrxJhcyga2lQSRXM1yG5YLtc0Kkm6Qbg0k35PTtjW/wCng5slHm5x/JBV9WvpJnvaTVpa1uZ+oA2o4ZgnxRjck/R2CF/BkhHfSTJCFtuWWzsYZcIx5hoNXAih63PzWfM+aOj+HxTbb/keo3NbBNEyQaOaD3HePA1QJ+0yetpjZ7sdfFx/sFsfs5tuKF0Vc2SVH3ZASP8AkHoT24nx2+X7OFnk0fNNxu6ZjzQ2TcTKsVnMsrIwQC9zWAuNGguNASeCsX9dT7JJ0chFcOPgaVcMxuNWniCKZ8M4qG1GtG73HPuH6CY77EDw1pU6nP5DyUqYKax2Z0sjY2CrnGg+Z5Km0lbCSt0i5cd0utD9D0bSMbqZAcK8Sji022SGF8kYOQo3IkVGgy+CihYYGezxOGBoAeaZuf8AWqVj2jaIRy9GSTGO1TQO5BcHLmnqcvwTpeD0ODDDT4bm0rM23Xa22Rm0WVtJB/EQDUE6vYN4OdfHfVDpFPhTgRuXpcV146WqzTASEVxDsPG9rwNQaa8ll7Q3D7QHTRNwTAVlhrk77bDvW+GrTaUlS/w/2Obl0Ukm4uwMjcrLdFToQaEHxFFbi0WwwF/Zi722iZ8TjTLGO8UB9ERSbGsH+4fNCuzVoLLWC00Jyz+0CEXWu9nsJjyJqKHgFShu6Di6XPRRtuyrGNJDzkK0qsjZm1tinxPNBhIr5LXva8nOa8af+NEIl9KIJ/FWg8a3NI9D/wAwwfzEl570/IpLP6svo1e3ie3gruN1CoA5dtKsSeebX2DorW+nZf1x46+vxWOGI82+sWOBkrdY3YT912XxogUMcs2ZVI1YpXEbCnDE/RuXQjcM0oacvo0VJyVd1ubTKtedFBPPjOuW4fmov13ro4dJFJOfZzsuqk3UejrGuSVHhI0quXSHeCtrZiOZ2/r5c1WsD6Sd6Usp0OfAqvE+jweaTJ8oJdG+CnhgdI8MY0ucdANT/bmq8TiSABUmgAGpJ0C9Q2bupsEDSMOJ3adqSeFadnkqzZlBcdjcGF5H+hDs9ZG2KyEPPWJxPO6oaBQchRADYX2id3RMLi57nADQBziczoBmjy/LqknLRipF9YA9Zx4cAPiql5Wz2SMMhicOFGVGW/LXzWOGdxt9tnQyYVOo9JGvdtkdDZrMyTDVpIdQ1GeMj4hYe3IcXtdq1ooeWLQ+nqFWvC1SmzWeRuPpHFz3UBOHC6jRhGgoPVa9ktpkaOkiObRiqKDgQQqyzkmnIbp1GMbiZ37P5qWlzeLQ7+l1P/she+p8dpmdxkf6OI/JGV22OOzWkyNNGljhhO51Q4UPDJefvkxOJ4knzK2aeSceDFrXeSzsFVmnFITuAoP15qWR+FpP65KCyCja8U99mQsVRTs5BLBA60sYHuk+jjpmW5kF54D5IdsN3yTkiMDLUnQI7Is9l6OQS9G2OMjo3OqJHa6bysWqzw/6+2/Bv0mmm/8AkfCXRlX9eQskAbWrzkOJJ7Tighkhec9NTzJ3E/FK/bzdaZnSuyqThaNGjgFFZCaaIdJg9Jc9vsrW6r1p8dLr9wk2fvySyuqM2HtM3d7eB+KNrLbWyNErHYm1OYycwnUHh3Ly8E8PM/IFXbsvGSzvxs7nNrUOHAinqi1WjWVXHhl6XWvE9suV/gJds7pj6MWiMUdWjwN/Om5DEB6qPLstUVoge/Ccx2Scmk5EEb0BXix0UrmBtRXLMCle9I0WV16cu0N1+BKssOn/ALK1mlpNX7TB6lGEUTCGOLutj63IAoHstTI3nINeVNfVbjrzPAaroxnUWjm7b5NjaGRrXvwEEFo0QuwVKtWi2461GqpsrVIyv4mjAvkT4U65BPBOsR0D3QWFvEpxYR7xUrSuqrZSOXuZn3lA0tMBNekY+n4afNeXOma0lriQQSDlvBoUc39eAbbGcYmtf+F5LX+lD4IJ26srobY4tAwyASN8cnDzFfFIz41JD8MmuBm2uPj6Khe9vBGBhy1ceJOg7t/iFm9O/gFFJLvOtdPAZodPiSnbC1Mns4JGaZp6qCOXikbSF01JHM5LIUkMTnuDGNLnHRoFSfBK5o/aJ2RNzLq5VpXC0uoDTImhXqGzcEUbQGMoAAet2qnJxJGtS31VuaIo2Dd2fs4fK2s7hGD9VoxO8TUAeqiv3YOxWYAvtU4c7ssAjc555CgoOZNF6Wy2DhRef30581obM4Cjmhozr0dC8FveMwQs+bJtjZpw4t0qM66bpjgfjGJxp1cdKt4nq5VK2o5HnqgkDcQSKV5KpE8tDiRU8j89F1ar6kjw4YnYQAOqAcxqSubKTm7Z04QUFUSSWa1McAJcTCdTGXEeLaLWYxjwMbqny+Cx7PtUSWt6OSp40HfmSrlvsptBacDDxxOIPgQPzQhGo0sFAHDzTWyECMPDwc+zvz4LDfs8xx60RG/qvcaeqnslibCMLS47+ti9MW5SwqJWsBzcB5IdvLZ5r5A6I4Q5wDhStMRpVo8dESVy+SqRO+kYCP8AcZ/3D5o8c5QdxYvJCMo8mbeX7PniBzmS9I9nWLA2mJv2cz1hwQcIwMuC9+qGvb9qrf8AiXcB7pQLtbsm2SQyRnA85n3Xd/A811MeTjk5Mo88A3srb2scYnZB5yPA80+2P71rciMOSxLdZHwPwPydkciDluII7k9st75S0vIJa0NBpTIceJSfbL11lX/pr94/bPDLvx/KyAQtGYA8l0XrjGlj4rYYBy5cuXDzRT3dHjfmMhr+vAqm6CSCPYtzjHaPdozzr8ln7SHDae9oWxstMXTCIUbG40IAFSAMlTvqOWeaSFoDy0nDkAQBz8VzlCtQ8r66Om53pvSp33/cG7tgEkzGnQufXyr+S2nXC3dVURcs8coBYRQkkjPWu8LQhu20ONGteT3kfFVltu0KwxpVLsidcQ4H1TMusMOWde9V7VI6J2CRxa7gSaqH21v8z1KU1NjltTNYWH9UKZZftw/mepSQenILej3oLsLkJyaAngFvOaeZ33ba3k9x7IIjP3cND6kq1tZH0lijlpV8LujdX3TlX/tKG7VMHyvf7z3HzcUYXDO2djoic5IzUbw5vVr5YfJKjNOVMfKLUeAEu6ISPwuY6hoAWHTmagj1V29Nn2Nw0e+prrQ6U5BV5r5ZG9zH4w5pLSOYyK4dtDGfryeIJUlildxdALMqqSspTXI/c8f0/wB07dnuqCXPrSpOAFpPKhJyz3eSuf4/F77j+BOL5jPv+DHIXHMvKCTwv+FmRLZJIJAY8btHBwa5pBqdAc92qL7q2weD9LDJUihLQ4jvo7MZ6jPOqym3ix31ZD+ErfuK1Nc4NFnkz1fTTmSaZKerkSp1/UtYoXav+hddtjGPqy/9N2XosO1X1EHuc15DXuxZsfWOQ1JJaR1mHOtMxVF8t2tdqAh+8LKC8inUaaUGRc7vSZZGvzI0Riv4Spbr0jaQQ5mMt+q5rmuB4OGR0r8ldsd7WYMYXPq4t62fZcNW0VO3WZjzXA0ZAANaABQcPzVaTZ1pAOBpqK5DRKU4DuTStl4WFzcWBmIHU1xeBGarMtUzjSyh2GlfpHAtpyLuss5+zzQK4ArFjsLIz2nty+q535FRzh4IrNeGW8GivQscAPqvzoOSsz3y57WmUNaaZAGpz0VSOVga4dNLmKZOIO/f4rMZczCKivmdVTyRoI3LLasYOdBxUMluha4HpB1JI3O3uo1wJAbWudD8ws+C6W7x6lcPuKOuQFSQBkKZlUpxsphtZtpoJ5I2sLyQS7Nha0AMc01JcadpPf8AfdnY3rTMBppUV8lgWHZcNeMeEtdk4ClTvHqFLeexlnoaNAPd+S248zrlGKeKLfDALaW92TzYmAgBoGepzJrTdqs6GKR4xMYSKgV3AkgD4jzRBPcbGOIdGK+KmgsTGtLcGuudBrwUlrKXBFpX5YNeyTVaOjNXEtFaZuGre9VXSuBociMiN6NOhaDlGNSeOvek2BvujyCBax+UF7RfYGNNePkVsXbURPdQg56g8BRb7ixjScOgWQ68Cal1BTQCoa2vGmpyTsWeWTxwKyYo4/Jo7Ll8c8b3mjBr5LeZduC0SWlszet2WjtUJFc6oIN51oA70yXEd5S4jhf/AMP7q8sXKDivJMOVQyRk/B6E60O4lL2mRgDqOFa0JXn7b1lOQlJ/CR+aMdmp2zfRzY+lArRxcAW7iAuZ7GaV2ddfiWJuqYOX/ZpZ5jJ0cj6gDEGOIy3VAosp11yfyZP+m/5L1+KFrGhrRQDculthcYpGDLkjKTdHjv8Ahsn8p/8AQ75JL150pB09UkdsXuj9I3W2vizyIUF7W8NgkIBrhIGmpFEySF5JJWCscWzyqG4n7nuH4qrQu66LQ2QGOajt2QSSWJZZNmpxSK1r2exSOdKQ55JxE7zXNTWfZqPfTyCSSr1Jt1ZKS6Rfi2diCtw3DHwSSRpX2DuYz7ta05ALWu6cNoCOSdJUuHwRu0bkLGuzCHb6suF9N2bh4klMkm5eYAwdMosswUnR0GRSSWSh1nDgTkT6J3WBrsykkokSzpl3MG5Ty2duWEUSSRUXbIxZ1EbP1h3j0KSSlFWFLRVzeWe/gVSvO00ySSWltqIhLkGrwj6RwPKigFjSSWZmhM79lC5NkTpKEso2ywuoaLGNmmDHRaxudjIqK1y367gkkmwyyh0DPGp9kP8Ahzvc/wCSf2GTQMH9SSSZ7mYv28Dj2CQbh5hFezFkfJMbRK6rw3ABy45JJIo55SdMGWCMVaCqhSwlJJNsVRyWHikkkqJR/9k="
    },
    {
      id: 3,
      name: "Melker Jernberg",
      company: "Volvo Construction Equipment ",
      rating: 4,
      comment: "High-quality machinery with readily available spare parts. MachinePro understands the importance of minimizing downtime in large-scale projects.",
      image: "data:image/jpeg;base64,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"
    },
    {
      id: 4,
      name: "Jim Umpleby",
      company: "Caterpillar Inc.",
      rating: 5,
      comment: " Very satisfied with their excavator range and maintenance support.",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEBUSDxIQFRUVEBUVFRUVEBUVEBUPFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0dIB4tLS0uLS0tKy0tLi0tLS8tLS0tKy0tLS0tLS0rLS0rLSstLS0tLS0tLS0tLSsrLS0rLf/AABEIAPsAyQMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwEFBgQAB//EAD8QAAEDAgQDBgMFBgQHAAAAAAEAAhEDIQQFEjFBUWEGInGBkaETscEyQlLh8CNicpLR8RRTgqIHFiQzY3Oy/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECAwQF/8QAKBEBAQACAQQBBAAHAAAAAAAAAAECEQMSITFBBCJRYXETMkKRobHw/9oADAMBAAIRAxEAPwCkhehGQohZNgEICEwhQQpCyEJCZC9pRBUISE0hCQgWQhKaQghSFkKCmEKIUhRCghMIQwiCyFEJhCGEQWQoIRkKCEC0JCZCEoAKFMIQlABCEo4UEIFkKEZChBqiFBCcWoYVFyoUEJulCQgUQoITIUQpCiEJCdCEhEFEIQ2TA4n3Rl4A4edgVX/4hznAQfAE3N7+Aum06dxpGJt9PGUylgi7b3FklmJ0mAWuI47MbyBOw8LkrvGKaBc6ncmthobzlx7v+r8lHUnSvxFAtMHlP0SSFZ0sxEkNBiI+xqbHE94X43FlGJpMdJaGzb9z5kjyTqNKwhCvV3Fjoc10c4+swfJS1wOyttXQChITSEBClUsoSEyFBCBZQlMIQlABQlMIQEIAKiERCiEGwhQWpkKC1ZrlEIdKcQo0qQiFGlO0oSECtKrsdir6WkdT/RdeZYsUmaj4CBxWQxOJiTqmZ4QR4IhcVsWHANk2PEjiIH66rhrY2LU5BfYnjpnYclU0cSSTHFdzMO5xBHX3M/VPCZ3dH+JP2WGALF0DV10n5n+y6P8AHOADWi3ACZJIuXHdOwWSOcBbof1+tleYbs6DvyhUucjTHiyqnp5i5rQA1nH7st8xsV0YZ7ahl5peQ0x1gmFaYvs4SIYOir25ViaV20nfzO+TSFEzlTePKE4jCv3DmkQfs1GmBwtNlTPrOpmeE8rDoVeYg1Dd9N1t+MesriaGu3LB/FHobWVpYpcbB4euHiR6JhCrMQBRdqp3Gq4BkAHcTy/orRpkSFpGdgCEJCaQhIUoKIQkJhCEhAshCUwoSECyF6ERC8g2LQvEI2hSQs2pJCiEwhe0ogohCQmwh0qUMx2nxLZ0QTAveBe/Az9Fk8Tc2B8zKvu0dQfHfI2jkJsNzyVNcvE+kbDkpV9uzL8IBErU5bhxyVFhWrTZVsufOurjxXmGpCArDDsXFhyrGg5YbdkPa1OZRJQhdDaljwSJtVeIww2IHIrI9ocqDGF7BtfyK2dd0rgxlMOYWn7wIU45aqvJjMo+bVXSy7QDsDydEhp8RPou3LnzTHSx8UvMML+wc8biGnmH03WPz9UnJ8SHEjiWgkcnCxjx+i7sXmZedLOEBCaQgIVlSiEJCYUBRAIQkI0JCAChhGQoQbVoUkKWqSsmpULxCZChwUhYCEowoIQYTtdqGIPAaRFvf5qnY7v+S1PbvD9ynUHBxafAiR8vdZCk7vBW9Ke17lx4LW5bS2WOy5wDrlaSlnlFgibjkufObdPHlJ5aqlTC7WM2VDl2cUnizrzsVeUsQHOsf7xK57NOvGy+HZp8UekdVX4vHhgv+apX9r2scWubtxmytMdq5ZyNFVpwuCq+65KfaSnU2n6o2V2uu0qOnSZnKzGbjvV6UWLfiDpNj6mFnMmYRV8JH5rT5zT1V3R/kj/6O3M7KkyujpqEcvkV28f8rz+WfVVoQhITSEJC0ZlEJbgnOQOCBUISEwhCQiCyFEIiFEINsEUKQFJWTYEIXhMhQ4IEwvQjIXoUoV2b4NtWi9jh90kdHC4Pqvl+GHfW57X4+pTcxrCQ1zSSQYJIP9vVZLRL56qZUXH2aKJc4Aeq7sRiMO1gBpvcTbVOlm4EzvaeS7cnwDaliYm211p8PlT6fdhrgOZhY3ORrjhawzKdVgDmjumSIMgtaSCRzFluOw1d9XWXcNv5UnOGNIGprAb7XgcVadiqAZSJHElUzssbceNlc+c0Kkwwk35bAdfNZbE1alJ7SaAqAugy17nQDBsF9Gr0rna/SVwNy1wdIczzbf2IVMcpPK+eFrO4J9KrAfh3YeoR3dyw9Jix6FW2Cwr2A6grmjgQftiY5WHkm1MOIMXUXPZMNMDn1UtxA5Q0Hwn9eqVgMKZdUDXaYA1QY9Voq2XNOJbUfBaGkOB43suzOX1O42npbT0u1N030wY8Ftjy61Iyy4eq21myEJTCEBC6nIWQgcE0hA4IgohCQjKEogsqIRlRCDbAKSFIUFZNngoKkKYQL0rxCYQhhSMv22w5NJjwPsvg9A4f1A9Vjgf2luq+pYvDtqMcx2zgQfNfNMThSyo4HdpLT/UKD0usgxH7QDrK3nxpC+XYLEFjwRzWwq5kW0pBuQufkx7unhymh54ZkNvFzyHTxV/2YwZbTHhK+a1s1qNDtzqdJ8jK2PZftUNIkgQIv0VuiyGOc6mnqkyU5rmkRN+R3VPic+L+9QpmodrENZHEyd00guZLu6/fewPJZZY6dGN2u6bQGlcz3hcWDzAvZpP2hYofikgqv4FdjnOJJZ906j4SJXTmFWaQcRcs93AtHz9kOCw5eXkkAAAHnckwPRIzypJDBYAbchsB8/VaYY7yjPky1hapXBBCcQhIXa84khLcE5wSyFISQhITYQkIqUQhhMIUQg2oUIkKybJCKFAUoBIUIl6EAFZLtdlby8VWMc4EAO0tJIcNiQL7R6LXQpIUj5QDpcJtBuDvKvTig6kZ5Lg7V4T4eJeOD++3/Vv/ALpTstotqMjURIg3i4VMpE42+BUcOH9VdZZ2bYe8QD5qmoZUdRAqutaDwPMELT5dl1INOtuJJ4FlQRsObhxlRfxW2ON862vMNT0NAAbA4CNkD6o6/klPwFFwOihWHdjU+q4d7gYDjPsl0Moaahd3xNg34rywQNxe5KzykjbG5fZ0PpiQ5m8eymbOPX6L1GiKZIJm1rk+5KVjqkANG5uVle9TL904THtY14IJJdI5bAb+qq67y5xJ3JRwgcF18eEk24+XkuXb7OchAQnEIHBaxiS5AQmkICFIUUBCaQgKILIQo3IEQ2SkBeClZNhNXivKCUHl5QESDwCEleUQpGe7bYAPw/xI71Mgg/uuIDh8j5LF5bXc11v0V9KzmiX4eq0caTo8QJHyXyxpgp5iPDS/FJIqDiL+Ku8vzIxe3yVNkmLaQQ7Z0HwdsT5rSYbC07W91hl27Onjt9VY0cc53M/JdbKkCUGHpUwBA95R4gtHJZ1t1OOsSSXHYfPguEtc9/mJPIcgurE1baBcm58eC6KeHgBrd5A8z9o+QlMZd6ntS+N30rXJTl14ujocR6eHBcrl2612cG99ySgcmwgIUhJCBwTXBAVIUQgcmEIHBEFOQJjkKIbALwKAFHKybCQqZQoDClQCvSg8pAXlD3hoJcQABJJMADqVKCcZXaxhc4jkJ4uOwXyaq2CRyMeivc/zsYjFNbTdNOnIaeDn6Tqd8gPDqq3FYQmXM8x1V+jsz6+7nwlctMtWhwWbXFyD42Wcotv1VtlWWuqvjUQs8te2uNvpqsJnQ5mfC5XTUxrnfZ32HTqVyUuzRbHfcVoMJl8gNDZPIfXksbrese7eb/q7OTLqBnU6SfqVoqWDLQHOF4sOQO5PVdmAy1tO5gu9h4J2Iuu3g+P03qy8uTn+R1Tpx8MT24qGlSZWabtqaS07OaQTB/l9yq3A41lZgew24ji13Irh/wCJmaaqrcO02pCX/wDtcNvJsfzFZDK8c+i7Uw+I+64citOWS3sx47qPoZCBwXLl2aU6w7tncWnfy5hdblg2IcEBTSgcFIWUDkwoHBAohDCYQohFWoCmUAK9KzajlelQvBAYRBVOZZ/QoSHO1O/A25nqdgshmvaivWkNPw2cmm5HV259lMxtVuUjXZv2joYcEE63j7jYJnqdgvn+d59XxJ75hvCm09wcp/Eep9lXGpquLoH2WkxkZ3K03K3ftR/C5ajL2SVkcOYqMPWPZarL3kOCvipWk/5TZXbqZDKnA/dPRw+q4cNldahX01Glp3HI9QeITavbptA/DosD3CznEyxp5AC7j5jzXDie1eMxbg2ZYDs2g3UBxg7i3CVHN0ZTt5b/AB8OS38NtlRfVOkSADd3LoOZWswmHDBAH9SvnnZXtPUZ3a7aWgC2kaKkDl90+Fl9CwGOpV6YqUXtex2zgbdQeRHEFODHCTt5R8qcmOWsjnlVmdZgzD0KlZ+zGExzd91o6kwFZL5l/wAXc1/7eFaf/I/3DAfc+i6N6cvl88xGKdUe59Qy57i4n95xkpYCABGx3NYtXVQcRcEgjYgwZVzgu0DhaqNQ57O/NUPxg3c+ihj5v1UWSkum7w+KZUEscD04jxCJyxFKsWmWkg8xurnB56dqonqLO9OKpcV5kuyEJCGhiWPHccD04+iYVCxRQJjghhENDK9qAudvZZ7Oe0QouLKYDnNHeJ+yCdhbcrK5hm9asf2jjH4RZo8lWYWpucja5h2moU7NPxHfu/Z83f0lZfM+0lerYHQ38LbertyqMvQalpMZFLlaaXIXPSnvgIHOUqiJA2SnOQuKiUHRRb3mfxK1zPG/CZDT33CAfwt4u8eS48uwjqn2Ilo1X5BWb8u+JR+I4Xm/hwCtEKHDPGoB5IA5C60GTPLA6o1z2iIHWeB4c1RVsPDoHNabAGsaQw9MN0ucwOLhZrnmAZ4CY84WOU76el8XL6blfSMV8R7NctcXE2mXiDcnltHmkdn+0OJwFUvpA6HHv0nTof16O6j3X0XKcio0WAQCfvEi7nRv4dFaM7PYerLq1NpEQBGw5rfHi6XJ8j5N5Lr06+z3aTD4yiatJ0Fo/aMd9thjiOXXYr4n2lzI4nF1KvBzzp/gFm+wCv8AtZllHBud/hX1GOLHB0Ot8Nwgt81j6TVbK+nPJ7SQhKNyCFmshMa5LhSUDdS9qSgVOpB0MrkXBVphc7qCz+8OtneqpA5SHJo219DMKb9jB5G3910LFB5RfFdzKr0rdRD8Q5+tzt3O1HxJlL1pNJ1j4fmvAqVTpUEoAVKAamyBpkIylM4hBJQoihQaDsvVDXPJ/wAl3zar8EMwd9zKyeVvieoj1havtAwMw9MdPorTwhkpmqJBIkTG8TeOq0deqw1wMP3RTYHm5AcWQ4gT4ceIVLk9N1SoAGzBLtvnPBdo0ncEHWSSPwkbQsMr3ev8fj+h9RyXGkv0OuIkHoVoMZWDKRceAWF7HY0Oc1puRTF/C0fJWvbvMdFDQDd1vJdeN3NvJ5cOnO4vmvajHmrVJn7Tv9o/QVUAprO1VCeAt6KSs0FuQlEVChISfb5oYUlSgFeARBqMBAGlE0IkLnQJPBEJJXpQN2vuVGpSOTC7rwQ0d0VYw49b+qqkQKKUsFGglKdYymIXiyAUBRyhKC27P09VVjebwr/t3iYe2m3gB9PyVN2OP/V0p/H8wUPaPE/FxFV82FTSB0Cm3WK2E3lHdk9J9F3dIksPERpj8vYKxoUn0jTrOZLNZIkfP5jwXLkGGbU1l9SNLSQTN+GozwFvULpb8R4ZTDhGs6WyLOtc9L281zXz/p73FJ0a+3n9aduSYkCuXsGka7Dk07fJK7bZprqWNmiB4lctTEOpPfSfvq1Tzda/mDKpszqlz48z9F0YX6XkfMk/i3/vTmpNgIivBC5WcoSoJ9/kpNkphkyiRQpCkqWohIXivKCUHkioZIHmfomuMJNHiTxUJFUKDUjehRDkposUbg9ENNexBsPFQkTCmApDCnBASlQFKBDOI5FecpfZ3ioIQdmVYg06ge3dpkeSHB6TUGudOq/glYQ95dNCIa1rZIcZ3k32VcvDfgm8l2009btE6fu8ptPlv7Kyr06YpU3Mf3ybjiI49IPrMriy2vTYyo17JcRDd7dOkb9V5tVg065A4333g+G3usb5/b28LZj77f57KzE4guxEl03MnmeaS52pxd1t4BcVWpNUlm2ox4XXW0QFvh4eHz5dWdolBK9KBx/X1V2Aal7fqV5jUJUhxUJMXgUvUV7UUBkqHICT0QucgjEO4c/kjaICRTu6eSeSghxQalJXoRDjaENYo0qoqpSwp7VzsXQxAYUoQiUhdcWQzaUx+yTT280DKRgq1wFU06rXwDcxYXHHzuqlu6sQ8iIJtcX2Ji/sFXLw3+P3z0t2h7w+pptIkgbHp+vFK7QZiHsY0NALWxbieQ6LqwtZww1QAmPiMEcIc10/IKhx7yXiTsI8lnPP7ejy5awvbx4/s5sG3iuwJGG2808reeHkZXdQ4oZHNQeCJFQkjmoEIlKAfX0Xp6KV5yBbnJVZya5cuINiiTMILJxagobJwKQLIQonoYRD/9k="
    }
  ];

  // Update visible logos whenever currentLogoIndex changes
  useEffect(() => {
    // Determine how many logos to show based on screen width
    const getVisibleCount = () => {
      if (typeof window !== 'undefined') {
        return window.innerWidth < 768 ? 1 : 3;
      }
      return 3; // Default to 3 for SSR
    };

    const visibleCount = getVisibleCount();
    const newVisibleLogos = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentLogoIndex + i) % companyLogos.length;
      newVisibleLogos.push(companyLogos[index]);
    }
    
    setVisibleLogos(newVisibleLogos);
  }, [currentLogoIndex, companyLogos.length]);

  // Logo carousel auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % companyLogos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [companyLogos.length]);

  // Handle manual logo navigation
  const navigateLogo = (direction) => {
    if (direction === 'next') {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % companyLogos.length);
    } else {
      setCurrentLogoIndex((prevIndex) => (prevIndex - 1 + companyLogos.length) % companyLogos.length);
    }
  };

  return (
    <div className="relative bg-gray-50">
      {/* Overlay for mobile - only appears when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className="min-h-screen transition-all duration-300 md:ml-0">
        {/* Hero Banner */}
        <div className="w-full h-64 md:h-96 bg-gray-700 relative overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Heavy machinery" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
            <div className="container mx-auto px-6 text-white">
              <h1 className="text-3xl md:text-5xl font-bold">
                We are now the<br />
                <span className="text-4xl md:text-6xl text-yellow-500">OFFICIAL PARTNER</span><br />
                of ACE
              </h1>
            </div>
          </div>
        </div>

        {/* Brand Logos Carousel - Fixed Implementation */}
        <div className="py-8 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-6">Our Trusted Partners</h2>
            
            <div className="relative px-12">
              {/* Previous button */}
              <button 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-yellow-500 transition-colors focus:outline-none z-10"
                onClick={() => navigateLogo('prev')}
                aria-label="Previous logos"
              >
                <ChevronRight size={24} className="transform rotate-180" />
              </button>
              
              {/* Logo carousel */}
              <div className="overflow-hidden">
                <div className="flex justify-center items-center space-x-8">
                  {visibleLogos.map((logo, index) => (
                    <motion.a 
                      key={`${currentLogoIndex}-${index}`}
                      href={logo.url}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="block w-48 h-20 flex-shrink-0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-full h-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex items-center justify-center">
                        <img 
                          src={logo.src}
                          alt={logo.alt}
                          className="max-w-full max-h-full object-contain"
                        />
                        <span className="sr-only">{logo.alt}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
              
              {/* Next button */}
              <button 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-yellow-500 transition-colors focus:outline-none z-10"
                onClick={() => navigateLogo('next')}
                aria-label="Next logos"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {companyLogos.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentLogoIndex ? 'bg-yellow-500' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentLogoIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div className="py-12 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">About MachinePro</h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Our rigorous inspection facilities and state-of-the-art manufacturing setup ensure consistent quality and the ability to meet specific needs. We also offer comprehensive after-sales services, including repair, maintenance, and spare parts for all construction machinery brands.
              </p>
            </div>

            {/* Why Choose Us Section */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* All Machinery Stock Ready Available */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-yellow-500 mb-4">
                  <Truck size={40} className="inline-block" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">All Machinery Stock Ready Available</h3>
                <p className="text-gray-600">
                  We maintain a large inventory of machinery to ensure quick delivery and availability for all your construction needs.
                </p>
              </div>

              {/* All Makes and Models Spare Parts */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-yellow-500 mb-4">
                  <Shield size={40} className="inline-block" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">All Makes and Models Spare Parts</h3>
                <p className="text-gray-600">
                  We provide genuine spare parts for all major brands and models, ensuring your machinery runs smoothly.
                </p>
              </div>

              {/* On-Site and In-House Servicing */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-yellow-500 mb-4">
                  <Zap size={40} className="inline-block" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">On-Site and In-House Servicing</h3>
                <p className="text-gray-600">
                  Our expert technicians offer both on-site and in-house servicing to keep your machinery in top condition.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Feedback Section */}
        <div className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
              <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                Feedback from our valued clients who trust MachinePro for their machinery needs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {customerFeedback.map((feedback) => (
                <motion.div 
                  key={feedback.id}
                  className="bg-gray-50 p-6 rounded-lg shadow border border-gray-100"
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="flex items-start">
                    <img 
                      src={feedback.image} 
                      alt={feedback.name} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={`${i < feedback.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <h4 className="font-bold text-lg">{feedback.name}</h4>
                      <p className="text-gray-500 text-sm">{feedback.company}</p>
                      <p className="mt-3 text-gray-700 italic">"{feedback.comment}"</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
          <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-xl mb-4">MachinePro</h4>
              <p className="text-gray-300">Industrial machinery solutions for modern enterprises</p>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">Products</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">Services</a></li>
                <li><a href="#" className="text-gray-300 hover:text-yellow-500 transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-300">Email: info@machinepro.com</li>
                <li className="text-gray-300">Phone: +1 (555) 123-4567</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4">Newsletter</h4>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full p-2 rounded mb-4 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
          <div className="text-center mt-8 border-t border-gray-700 pt-4 text-gray-300">
            © 2024 MachinePro. All Rights Reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MachineryHomepage;
