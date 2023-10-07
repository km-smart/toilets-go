package common;

import org.json.JSONArray;
import org.json.JSONObject;
import java.sql.ResultSet;

public class JsonUtil {
	// 단일 JSON return
	public static JSONObject convertOne(ResultSet resultSet) throws Exception {
		resultSet.next();
		
		int columns = resultSet.getMetaData().getColumnCount();
		JSONObject obj = new JSONObject();

		for (int i = 0; i < columns; i++)
			obj.put(resultSet.getMetaData().getColumnLabel(i + 1).toLowerCase(), resultSet.getObject(i + 1));
		
		return obj;
	}
	
	// 다행 JSON return
	public static JSONArray convertList(ResultSet resultSet) throws Exception {

		JSONArray jsonArray = new JSONArray();
		
		while (resultSet.next()) {
			int columns = resultSet.getMetaData().getColumnCount();
			JSONObject obj = new JSONObject();

			for (int i = 0; i < columns; i++)
				obj.put(resultSet.getMetaData().getColumnLabel(i + 1).toLowerCase(), resultSet.getObject(i + 1));

			jsonArray.put(obj);
		}
		return jsonArray;
	}
}
