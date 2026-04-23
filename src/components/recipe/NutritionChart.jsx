import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { extractNutrition, getMacroBreakdown } from "../../utils/formatters";
import { NUTRITION_COLORS } from "../../utils/constants";

const MACRO_COLORS = ["#eab308", "#22c55e", "#3b82f6"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="glass-card px-4 py-2 shadow-xl text-sm">
        <p className="font-semibold text-surface-800 dark:text-surface-200">
          {data.name || data.payload.name}
        </p>
        <p className="text-surface-600 dark:text-surface-400">
          {data.value}
          {data.payload.unit || "g"}
        </p>
        {data.payload.percentOfDailyNeeds && (
          <p className="text-primary-500 text-xs">
            {data.payload.percentOfDailyNeeds}% daily
          </p>
        )}
      </div>
    );
  }
  return null;
};

const NutritionChart = ({ recipe }) => {
  const nutritionData = useMemo(() => extractNutrition(recipe), [recipe]);
  const macroData = useMemo(() => getMacroBreakdown(recipe), [recipe]);

  if (!nutritionData.length) {
    return (
      <div className="glass-card p-6 text-center">
        <p className="text-surface-500 dark:text-surface-400">
          Nutrition data not available for this recipe.
        </p>
      </div>
    );
  }

  const calories = nutritionData.find((n) => n.name === "Calories");
  const barData = nutritionData.filter((n) => n.name !== "Calories");

  return (
    <div className="space-y-6">
      {calories && (
        <div className="text-center">
          <div className="inline-flex items-center gap-3 glass-card px-6 py-3">
            <div className="w-10 h-10 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center">
              <span className="text-accent-600 dark:text-accent-400 text-lg">
                🔥
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-surface-800 dark:text-surface-100">
                {calories.amount}
              </p>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                Calories
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {macroData.length > 0 && (
          <div className="glass-card p-5">
            <h4 className="text-sm font-semibold text-surface-700 dark:text-surface-300 mb-4">
              Macro Breakdown
            </h4>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={MACRO_COLORS[index % MACRO_COLORS.length]}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => (
                    <span className="text-xs text-surface-600 dark:text-surface-400">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {barData.length > 0 && (
          <div className="glass-card p-5">
            <h4 className="text-sm font-semibold text-surface-700 dark:text-surface-300 mb-4">
              Nutrient Breakdown
            </h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  width={80}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" radius={[0, 6, 6, 0]} barSize={16}>
                  {barData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={NUTRITION_COLORS[entry.name] || "#64748b"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {nutritionData.slice(0, 8).map((nutrient) => (
          <div key={nutrient.name} className="glass-card p-3 text-center">
            <p className="text-lg font-bold text-surface-800 dark:text-surface-100">
              {nutrient.amount}
              <span className="text-xs font-normal text-surface-500">
                {nutrient.unit}
              </span>
            </p>
            <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5">
              {nutrient.name === "Carbohydrates" ? "Carbs" : nutrient.name}
            </p>
            {nutrient.percentOfDailyNeeds > 0 && (
              <div className="mt-2">
                <div className="h-1.5 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(nutrient.percentOfDailyNeeds, 100)}%`,
                      backgroundColor:
                        NUTRITION_COLORS[nutrient.name] || "#64748b",
                    }}
                  />
                </div>
                <p className="text-[10px] text-surface-400 mt-1">
                  {nutrient.percentOfDailyNeeds}% daily
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(NutritionChart);
