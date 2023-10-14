package common;

import org.json.JSONArray;
import org.json.JSONObject;
import java.sql.ResultSet;
import java.util.Arrays;
import java.util.stream.Collectors;

public class JsonUtil {
	// 단일 JSON return
	public static JSONObject convertOne(ResultSet resultSet) throws Exception {
		resultSet.next();
		
		int columns = resultSet.getMetaData().getColumnCount();
		JSONObject obj = new JSONObject();

		for (int i = 0; i < columns; i++)
			obj.put(makeCamelCase(resultSet.getMetaData().getColumnLabel(i + 1).toLowerCase()), resultSet.getObject(i + 1));
		
		return obj;
	}
	
	// 다행 JSON return
	public static JSONArray convertList(ResultSet resultSet) throws Exception {

		JSONArray jsonArray = new JSONArray();
		
		while (resultSet.next()) {
			int columns = resultSet.getMetaData().getColumnCount();
			JSONObject obj = new JSONObject();

			for (int i = 0; i < columns; i++)
				obj.put(makeCamelCase(resultSet.getMetaData().getColumnLabel(i + 1).toLowerCase()), resultSet.getObject(i + 1));

			jsonArray.put(obj);
		}
		return jsonArray;
	}
	
	public static String makeCamelCase(final String str) {
		String result = str.indexOf("_") != -1
	        ? str.substring(0, str.indexOf("_")) + 
	            Arrays.stream(str.substring(str.indexOf("_") + 1).split("_"))
	            .map(s -> Character.toUpperCase(s.charAt(0)) + s.substring(1)).collect(Collectors.joining())
	        : str;
	    return result;
	  }
}
