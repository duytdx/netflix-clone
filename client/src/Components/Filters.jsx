import React, { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import {
  LanguagesData,
  YearData,
  TimesData,
  RatesData,
  QualityData,
  StatusData,
  GenreData,
} from "../Data/FilterData.jsx";
import { getAllMovies } from "../Redux/Actions/MoviesActions";
import { useDispatch } from "react-redux";

function Filters() {
  const dispatch = useDispatch();
  const [genre, setGenre] = useState(GenreData[0]);
  const [year, setYear] = useState(YearData[0]);
  const [time, setTime] = useState(TimesData[0]);
  const [rating, setRating] = useState(RatesData[0]);
  const [language, setLanguage] = useState(LanguagesData[0]);
  const [quality, setQuality] = useState(QualityData[0]);
  const [status, setStatus] = useState(StatusData[0]);

  const Filter = [
    {
      value: genre,
      onChange: setGenre,
      items: GenreData,
    },
    {
      value: language,
      onChange: setLanguage,
      items: LanguagesData,
    },
    {
      value: year,
      onChange: setYear,
      items: YearData,
    },
    {
      value: time,
      onChange: setTime,
      items: TimesData,
    },
    {
      value: rating,
      onChange: setRating,
      items: RatesData,
    },
    {
      value: quality,
      onChange: setQuality,
      items: QualityData,
    },
    {
      value: status,
      onChange: setStatus,
      items: StatusData,
    },
  ];

  // Xử lý thời gian
  const parseTime = (timeString) => {
    if (!timeString || timeString === "Sort By Duration") return null;
    
    if (timeString.includes("<")) {
      return { min: 0, max: parseInt(timeString.match(/\d+/)[0]) };
    }
    if (timeString.includes(">")) {
      return { min: parseInt(timeString.match(/\d+/)[0]), max: 999 };
    }
    
    const times = timeString.match(/\d+(\.\d+)?/g).map(Number);
    if (timeString.includes("hours")) {
      return {
        min: Math.round(times[0] * 60),
        max: Math.round(times[1] ? times[1] * 60 : times[0] * 60)
      };
    }
    return { min: times[0], max: times[1] || times[0] };
  };

  // Xử lý năm
  const parseYear = (yearString) => {
    if (!yearString || yearString === "Sort By Year") return null;
    
    if (yearString.includes("<")) {
      return { min: 0, max: parseInt(yearString.match(/\d+/)[0]) };
    }
    if (yearString.includes("-")) {
      const years = yearString.match(/\d+/g).map(Number);
      return { min: years[0], max: years[1] };
    }
    const year = parseInt(yearString);
    return { min: year, max: year };
  };

  // Xử lý rating
  const parseRating = (ratingString) => {
    if (!ratingString || ratingString === "Sort By Rating") return null;
    const rating = parseInt(ratingString.match(/\d+/)[0]);
    return { min: rating, max: 10 };
  };

  useEffect(() => {
    const time_range = parseTime(time.title);
    const year_range = parseYear(year.title);
    const rating_range = parseRating(rating.title);

    dispatch(
      getAllMovies({
        genre: genre.title === "Sort By Genre" ? "" : genre.title,
        language: language.title === "Sort By Language" ? "" : language.title,
        year_min: year_range?.min || "",
        year_max: year_range?.max || "",
        duration_min: time_range?.min || "",
        duration_max: time_range?.max || "",
        rating_min: rating_range?.min || "",
        rating_max: rating_range?.max || "",
        quality: quality.title === "Sort By Quality" ? "" : quality.title,
        status: status.title === "Sort By Status" ? "" : status.title,
      })
    );
  }, [dispatch, genre, language, year, time, rating, quality, status]);

  return (
    <div className="my-6 bg-dry border text-dryGray border-gray-800 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-12 gap-2 rounded p-6">
      {Filter.map((item, index) => (
        <Listbox key={index} value={item.value} onChange={item.onChange}>
          <div className="relative">
            <Listbox.Button className="relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs">
              <span className="block truncate">{item.value.title}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2">
                <SelectorIcon className="w-5 h-5" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-800 rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {item.items.map((option, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `${
                        active ? "text-white bg-red-500" : "text-gray-900"
                      } cursor-default select-none relative py-2 pl-10 pr-4`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`${selected ? "font-medium" : "font-normal"} block truncate`}>
                          {option.title}
                        </span>
                        {selected ? (
                          <span className={`${active ? "text-white" : "text-red-500"} absolute inset-y-0 left-0 flex items-center pl-3`}>
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      ))}
    </div>
  );
}

export default Filters;
